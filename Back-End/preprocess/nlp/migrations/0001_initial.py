# Generated by Django 3.2.12 on 2022-08-02 04:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel_id', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('file_ids', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=1023)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]