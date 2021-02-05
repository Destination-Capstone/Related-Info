CREATE TABLE IF NOT EXISTS city (
  city_id serial PRIMARY KEY,
  city_name varchar(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS home (
  home_id serial PRIMARY KEY,
  city_id integer,
  reservation_type_id smallint,
  home_description varchar(255) NOT NULL,
  price decimal(9,2) NOT NULL,
  beds smallint NOT NULL,
  review_count smallint DEFAULT 0 NOT NULL,
  liked boolean DEFAULT false NOT NULL,
  superhost boolean DEFAULT false NOT NULL,
  CONSTRAINT fk_city
    FOREIGN KEY(city_id)
      REFERENCES city(city_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_reservation_type
    FOREIGN KEY(reservation_type_id)
      REFERENCES reservation_type(reservation_type_id)
      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reservation_type (
  reservation_type_id smallserial PRIMARY KEY,
  reservation_type varchar(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS house_image (
  house_image_id serial PRIMARY KEY,
  home_id integer,
  url_string varchar(255) NOT NULL,
  CONSTRAINT fk_home
    FOREIGN KEY(home_id)
      REFERENCES home(home_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_image (
  activity_image_id serial PRIMARY KEY,
  activity_id integer,
  url_string varchar(255) NOT NULL,
  CONSTRAINT fk_activity
    FOREIGN KEY(activity_id)
      REFERENCES activity(activity_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity (
  activity_id serial PRIMARY KEY,
  city_id integer,
  review_count integer DEFAULT 0 NOT NULL,
  activity_description varchar(255) NOT NULL,
  price decimal(9,2) NOT NULL,
  liked boolean DEFAULT false NOT NULL,
  CONSTRAINT fk_city
    FOREIGN KEY(city_id)
      REFERENCES city(city_id)
      ON DELETE CASCADE
);