# Generated by Django 3.0.8 on 2020-08-28 19:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20200828_1321'),
    ]

    operations = [
        migrations.RenameField(
            model_name='assignment',
            old_name='assignment_file',
            new_name='pdf',
        ),
        migrations.RenameField(
            model_name='note',
            old_name='note_file',
            new_name='pdf',
        ),
    ]
