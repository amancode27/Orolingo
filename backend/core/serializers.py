from rest_framework import serializers
from rest_framework_jwt.settings import api_settings    # added this
from .models import *
from datetime import datetime
from django.utils.timezone import now
from rest_framework.validators import UniqueValidator
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.utils.translation import ugettext_lazy as _


class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token and provider.
    """
    provider = serializers.CharField(max_length=255, required=True)
    access_token = serializers.CharField(max_length=4096, required=True, trim_whitespace=True)


class UserSerializer(serializers.ModelSerializer): #added this for login

    class Meta:
        model = User
        fields = ('id', 'username', 'fullname', 'email', 'is_student', 'is_trainer')


class UserSerializerWithToken(serializers.ModelSerializer): # added this for signup

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):        #added this beacuse User class doesnt have get_token by deafult
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        # is_student = validated_data.pop('is_student', None)
        # if is_student:
        #     dictionary = {
        #         'user':instance,
        #         'languages_learnt':{},
        #         'languages_to_learn':{}
        #     }
        #     studentserializer = StudentSerializer(data = dictionary)
        #     if studentserializer.is_valid():
        #         studentserializer.save()
        if password is not None:
            instance.set_password(password)
        instance.save()
        user = validated_data.pop("username")
        user1 = User.objects.get(username=user)
        if user1.is_student:
            student = Student.objects.create(user=user1)
            student.save()
        else:
            trainer = Trainer.objects.create(user = user1)
            trainer.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'id', 'username', 'password', 'fullname', 'email', 'is_student', 'is_trainer')


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'

class AssignmentSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
                
class LanguageTrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageTrainer
        fields = '__all__'  

class ForumListSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    threads_count = serializers.SerializerMethodField()
    last_activity = serializers.SerializerMethodField()
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description',
            'posts_count',
            'threads_count',
            'last_activity'
        )
        read_only_fields = ('slug',)

    def get_posts_count(self, obj):
        return Post.objects.filter(thread__forum=obj).count()

    def get_threads_count(self, obj):
        return Thread.objects.filter(forum=obj).count()

    def get_last_activity(self, obj):
        try:
            thread = Thread.objects.filter(forum=obj).order_by('-last_activity').first()
            if thread:
                last_activity = {
                    'thread_id': thread.id,
                    'thread_name': thread.name,
                    'username': thread.creator.username,
                    'pinned': thread.pinned,
                    'naturaltime': naturaltime(thread.created_at)
                }
            post = Post.objects.filter(thread__forum=obj).order_by('-created_at').first()
            if post and post.created_at > thread.created_at:
                last_activity = {
                    'thread_id': post.thread.id,
                    'thread_name': post.thread.name,
                    'username': post.creator.username,
                    'pinned': post.thread.pinned,
                    'naturaltime': naturaltime(post.created_at),
                }
            return last_activity
        except:
            return None

class ForumCreateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description'
        )
        read_only_fields = ('slug',)
        lookup_field = 'slug'

class ForumUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description'
        )
        read_only_fields = ('slug', 'name')
        lookup_field = 'slug'

class ForumDetailSerializer(serializers.ModelSerializer):
    threads = serializers.SerializerMethodField()
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description',
            'threads'
        )
        read_only_fields = ('slug',)
        lookup_field = 'slug'

    def get_threads(self, obj):
        def get_last_activity(thread):
            try:
                post = Post.objects.filter(thread=thread).order_by('-created_at').first()
                if post:
                    return {
                        'naturaltime': naturaltime(post.created_at),
                        'username': post.creator.username,
                        'name': post.creator.profile.name
                    }
                return {
                    'naturaltime': naturaltime(thread.created_at),
                    'username': thread.creator.username,
                    'name': thread.creator.profile.name
                }
            except:
                return None

        def get_replies_count(thread):
            return Post.objects.filter(thread=thread).count()

        def get_detail(thread):
            return {
                'id': thread.id,
                'name': thread.name,
                'pinned': thread.pinned,
                'creator': thread.creator.username,
                'naturaltime': naturaltime(thread.created_at),
                'replies_count': get_replies_count(thread),
                'last_activity': get_last_activity(thread)
            }

        try:
            threads = Thread.objects.filter(forum=obj).order_by('-pinned', '-last_activity')
            return map(get_detail, threads)
        except:
            return []

class PostListSerializer(serializers.ModelSerializer):
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail'
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Post
        fields = (
            'id',
            'content',
            'thread',
            'created_at',
            'updated_at',
            'creator'
        )

class PostCreateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(allow_blank=False)
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail'
    )
    thread_id = serializers.IntegerField(
        required=True,
        help_text=_('Required. Id of the thread this post is created in')
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Post
        fields = (
            'id',
            'content',
            'thread',
            'thread_id',
            'created_at',
            'updated_at',
            'creator'
        )
        read_only_fields=('id', 'thread', 'created_at', 'updated_at', 'creator',)

    def create(self, validated_data):
        content = validated_data['content']
        thread_id = validated_data['thread_id']

        # Get thread object
        try:
            thread = Thread.objects.get(id=thread_id)
        except Thread.DoesNotExist:
            raise serializers.ValidationError('Thread does not exist, please enter correct thread id')

        # Get the requesting user
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        else:
            raise serializers.ValidationError('Must be authenticated to create post')

        # Create the post
        post = Post(
            content=content,
            thread=thread,
            creator=user
        )
        # Update the thread last_activity to post creation time
        post.save()
        thread.last_activity = post.created_at
        thread.save()
        return post

class PostUpdateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(required=True)
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail'
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Post
        fields = (
            'id',
            'content',
            'thread',
            'created_at',
            'updated_at',
            'creator'
        )
        read_only_fields=('id', 'thread', 'created_at', 'updated_at', 'creator',)

    def update(self, instance, validated_data):
        # Update fields if there is any change
        for field, value in validated_data.items():
            setattr(instance, field, value)
        # Update 'updated_at' field to now
        setattr(instance, 'updated_at', now())

        # Note: If user update post, it won't change the last_activity
        instance.save()
        return instance


class PostDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostDetailSerializer(serializers.ModelSerializer):
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail'
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Post
        fields = (
            'content',
            'thread',
            'created_at',
            'updated_at',
            'creator'
        )

class ThreadListSerializer(serializers.ModelSerializer):
    forum = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='forum-detail',
        lookup_field='slug'
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Thread
        fields = (
            'id',
            'name',
            'forum',
            'pinned',
            'content',
            'creator',
            'created_at',
            'last_activity'
        )

class ThreadCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, allow_blank=False)
    forum = serializers.SlugField(
        required=True,
        help_text=_('Required. Slug of the forum this thread is created in')
    )
    content = serializers.CharField(default='')
    class Meta:
        model = Thread
        fields = (
            'id',
            'name',
            'forum',
            'pinned',
            'content',
            'creator',
            'created_at',
            'last_activity'
        )
        read_only_fields=('id', 'pinned', 'creator', 'created_at', 'last_activity')

    def create(self, validated_data):
        name = validated_data['name']
        forum_slug = validated_data['forum']
        content = validated_data['content']

        # Get forum object
        try:
            forum = Forum.objects.get(slug=forum_slug)
        except Forum.DoesNotExist:
            raise serializers.ValidationError('Forum does not exist, please enter correct forum slug')

        # Get the requesting user
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        else:
            raise serializers.ValidationError('Must be authenticated to create thread')

        # Create the thread
        thread = Thread(
            name=name,
            forum=forum,
            content=content,
            creator=user
        )
        thread.save()
        return thread

class ThreadUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, allow_blank=True)
    content = serializers.CharField(allow_blank=True)
    pinned = serializers.BooleanField(default=False)
    class Meta:
        model = Thread
        fields = (
            'name',
            'forum',
            'pinned',
            'content',
            'creator',
            'created_at',
            'last_activity'
        )
        read_only_fields=('forum', 'creator', 'created_at', 'last_activity')

    def update(self, instance, validated_data):
        # Update fields if there is any change
        for field, value in validated_data.items():
            if value != '':
                setattr(instance, field, value)
        instance.save()
        return instance


class ThreadDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'

class CreatorSerializer(serializers.ModelSerializer):
    avatar = serializers.URLField(source='profile.avatar')
    status = serializers.URLField(source='profile.status')
    name = serializers.CharField(source='profile.name')
    class Meta:
        model = User
        fields = [
            'username',
            'name',
            'avatar',
            'status',
            'is_staff'
        ]

class ThreadPostSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'id',
            'content',
            'created_at',
            'creator'
        ]
    def get_created_at(self, obj):
        return naturaltime(obj.created_at)

class ThreadDetailSerializer(serializers.ModelSerializer):
    forum = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='forum-detail',
        lookup_field='slug'
    )
    creator = CreatorSerializer(read_only=True)
    posts = ThreadPostSerializer(many=True, read_only=True)
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Thread
        fields = (
            'id',
            'name',
            'forum',
            'pinned',
            'content',
            'creator',
            'created_at',
            'last_activity',
            'posts'
        )
        read_only_fields = ('id',)

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)
