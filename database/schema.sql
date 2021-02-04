CREATE TABLE IF NOT EXISTS cities (
  id serial PRIMARY KEY,
  cityName varchar(30) NOT NULL,
);

CREATE TABLE IF NOT EXISTS homes (
  id serial PRIMARY KEY,
  houseDescription varchar(255) NOT NULL,
  reservationType varchar(25) NOT NULL,
  price decimal(9,2) NOT NULL,
  beds smallint NOT NULL,
  reviewCount smallint DEFAULT 0 NOT NULL,
  liked boolean DEFAULT false NOT NULL,
  superhost boolean DEFAULT false NOT NULL,
);

CREATE TABLE IF NOT EXISTS house_images (
  id serial PRIMARY KEY,
  url_string varchar(50) NOT NULL,
);

CREATE TABLE IF NOT EXISTS activities_images (
  id serial PRIMARY KEY,
  url_string varchar(50) NOT NULL,
);

CREATE TABLE IF NOT EXISTS activities (
  id serial PRIMARY KEY,
  activity varchar(25) NOT NULL,
  activity_description varchar(255) NOT NULL,
  price smallint NOT NULL,
  liked boolean DEFAULT false NOT NULL,
);