CREATE TABLE IF NOT EXISTS cities (
  city_id serial PRIMARY KEY,
  cityName varchar(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS homes (
  home_id serial PRIMARY KEY,
  city_id integer,
  resType_id smallint,
  houseDescription varchar(255) NOT NULL,
  price decimal(9,2) NOT NULL,
  beds smallint NOT NULL,
  reviewCount smallint DEFAULT 0 NOT NULL,
  liked boolean DEFAULT false NOT NULL,
  superhost boolean DEFAULT false NOT NULL,
  CONSTRAINT fk_city
    FOREIGN KEY(city_id)
      REFERENCES cities(city_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_resType
    FOREIGN KEY(resType_id)
      REFERENCES reservationTypes(resType_id)
      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reservationTypes (
  resType_id smallserial PRIMARY KEY,
  resType varchar(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS house_images (
  houseImage_id serial PRIMARY KEY,
  home_id integer,
  url_string varchar(50) NOT NULL,
  CONSTRAINT fk_home
    FOREIGN KEY(home_id)
      REFERENCES homes(home_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activities_images (
  activityImage_id serial PRIMARY KEY,
  activity_id integer,
  url_string varchar(50) NOT NULL,
  CONSTRAINT fk_activity
    FOREIGN KEY(activity_id)
      REFERENCES activities(activity_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activities (
  activity_id serial PRIMARY KEY,
  city_id integer,
  reviewCount integer DEFAULT 0 NOT NULL,
  activity_description varchar(255) NOT NULL,
  price decimal(9,2) NOT NULL,
  liked boolean DEFAULT false NOT NULL,
  CONSTRAINT fk_city
    FOREIGN KEY(city_id)
      REFERENCES cities(city_id)
      ON DELETE CASCADE
);