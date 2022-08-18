# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Authority(models.Model):
    authority_name = models.CharField(primary_key=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'authority'


class Channel(models.Model):
    channel_id = models.CharField(primary_key=True, max_length=255)
    critical = models.TextField()  # This field type is a guess.
    name = models.CharField(max_length=255, blank=True, null=True)
    team = models.ForeignKey('Team', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'channel'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class HibernateSequence(models.Model):
    next_val = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hibernate_sequence'


class Lunch(models.Model):
    lunch_id = models.BigIntegerField(primary_key=True)
    date = models.DateField(blank=True, null=True)
    detail = models.CharField(max_length=255, blank=True, null=True)
    img = models.CharField(max_length=255, blank=True, null=True)
    main = models.CharField(max_length=255, blank=True, null=True)
    store = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lunch'


class Monthlyplan(models.Model):
    mp_id = models.BigIntegerField(primary_key=True)
    date = models.DateField(blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    track_track = models.ForeignKey('Track', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'monthlyplan'


class NlpNotice(models.Model):
    id = models.BigAutoField(primary_key=True)
    channel_id = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    file_ids = models.CharField(max_length=255)
    description = models.CharField(max_length=1023)
    date = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'nlp_notice'


class NlpTodo(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1023)
    status = models.CharField(max_length=255)
    file_ids = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    duedate = models.CharField(max_length=255)
    notice = models.ForeignKey(NlpNotice, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'nlp_todo'


class Notice(models.Model):
    source = models.CharField(max_length=31)
    notice_id = models.BigIntegerField(primary_key=True)
    date = models.DateTimeField(blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    file = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    channel = models.ForeignKey(Channel, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'notice'


class Team(models.Model):
    team_id = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'team'


class TeamUser(models.Model):
    id = models.BigIntegerField(primary_key=True)
    team = models.ForeignKey(Team, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'team_user'


class Todo(models.Model):
    todo_id = models.BigIntegerField(primary_key=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    channel = models.ForeignKey(Channel, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'todo'


class Track(models.Model):
    track_id = models.BigIntegerField(primary_key=True)
    gi = models.IntegerField()
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'track'


class User(models.Model):
    user_id = models.BigIntegerField(primary_key=True)
    edu_pw = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255)
    username = models.CharField(unique=True, max_length=255, blank=True, null=True)
    track_track = models.ForeignKey(Track, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class UserAuthority(models.Model):
    user = models.OneToOneField(User, models.DO_NOTHING, primary_key=True)
    authority_name = models.ForeignKey(Authority, models.DO_NOTHING, db_column='authority_name')

    class Meta:
        managed = False
        db_table = 'user_authority'
        unique_together = (('user', 'authority_name'),)


class Weeklyplan(models.Model):
    wp_id = models.BigIntegerField(primary_key=True)
    date = models.CharField(max_length=255, blank=True, null=True)
    time = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    track_track = models.ForeignKey(Track, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'weeklyplan'
