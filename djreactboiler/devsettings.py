"""
Django settings for djreactboiler project.

Generated by 'django-admin startproject' using Django 2.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'nh0=q5s4$g@hex4ml2yoofi4y8o@ns)4@76iryb^adt^#_tbuw'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'corsheaders',
    'rest_auth',
    'rest_auth.registration',
    'rest_framework',
    'rest_framework.authtoken',
    'users',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'djreactboiler.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],        
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djreactboiler.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

#Everything below is beyond what Django comes with initially.  
#Static files will store the JS files created after a npm run build command


STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static'),
]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

# In order to serve different sites in production, you’d create a separate settings file with each SITE_ID
#  (perhaps importing from a common settings file to avoid duplicating shared settings)
#   and then specify the appropriate DJANGO_SETTINGS_MODULE for each site.
SITE_ID = 1

REST_FRAMEWORK = {


    'DEFAULT_AUTHENTICATION_CLASSES': (
        #allauth is commented out for obvious reasons
        # 'rest_framework.permissions.AllowAny'
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    )

}

#For CORS Headers
# If, for example, you want to allow only one domain to be able to comunicate with the backend your setup will be

# CORS_ORIGIN_ALLOW_ALL = False

# CORS_ORIGIN_WHITELIST = (
#     '<YOUR_DOMAIN>[:PORT]',
# )
CORS_ORIGIN_ALLOW_ALL = True
import os
import psycopg2
# DATABASE_URL = os.environ['DATABASE_URL']

# conn = psycopg2.connect(DATABASE_URL, sslmode='require')

import dj_database_url
#DATABASES['default'] = dj_database_url.config(default='postgres://pribixbsqkccpx:a445355e4d5f1e3653dd9602de323497bb176c702da5751373a3cc6637a5b30b@ec2-54-225-110-152.compute-1.amazonaws.com:5432/d2iiusbuukpvjq')
#DATABASE_URL = 'postgres://pribixbsqkccpx:a445355e4d5f1e3653dd9602de323497bb176c702da5751373a3cc6637a5b30b@ec2-54-225-110-152.compute-1.amazonaws.com:5432/d2iiusbuukpvjq'

ACCOUNT_EMAIL_REQUIRED = False #Use if Email account is required for your site when signing up
ACCOUNT_AUTHENTICATION_METHOD = 'username' #For use during logins.  Can use email here
ACCOUNT_EMAIL_VERIFICATION = 'none'
#AUTH_USER_MODEL is needed if you aren't using the default user model, which is highly suggested
AUTH_USER_MODEL = 'users.CustomUser'  
#for use with api calls.  This requires the following commands in the js that is making the api calls.  In our case it's the auth.js in the store
#axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"; and
#axios.defaults.xsrfCookieName = "XCSRF-TOKEN"; 
CSRF_COOKIE_NAME = "XCSRF-TOKEN"  
