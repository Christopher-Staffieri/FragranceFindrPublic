FROM python:3.12

WORKDIR /code/
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY manage.py .
COPY ./backend ./backend/
EXPOSE 8000

# CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "backend.routing:application"]
CMD ["sh", "-c", "python manage.py makemigrations profiles && python manage.py migrate profiles && python manage.py makemigrations research && python manage.py makemigrations database && python manage.py migrate database && python manage.py migrate research && python manage.py makemigrations accounts && python manage.py migrate accounts && python manage.py makemigrations notifications && python manage.py migrate notifications && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
