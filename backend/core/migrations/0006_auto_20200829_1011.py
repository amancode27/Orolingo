# Generated by Django 3.0.8 on 2020-08-29 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20200829_0744'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='pdf',
            field=models.FileField(blank=True, null=True, upload_to='documents/'),
        ),
    ]
