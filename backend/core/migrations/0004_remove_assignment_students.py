# Generated by Django 3.0.8 on 2020-08-05 02:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20200803_1036'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assignment',
            name='students',
        ),
    ]