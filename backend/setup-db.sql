-- Create user and database for yeokk-da project
CREATE USER kangr WITH PASSWORD 'yeokkda12@@';
CREATE DATABASE yeokk_da OWNER kangr;
GRANT ALL PRIVILEGES ON DATABASE yeokk_da TO kangr;
