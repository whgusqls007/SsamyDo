# Generated by Django 3.2.12 on 2022-08-09 01:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nlp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notice',
            name='date',
            field=models.CharField(max_length=255),
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=1023)),
                ('status', models.CharField(max_length=255)),
                ('file_ids', models.CharField(max_length=255)),
                ('date', models.CharField(max_length=255)),
                ('duedate', models.CharField(max_length=255)),
                ('notice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='todos', to='nlp.notice')),
            ],
        ),
    ]