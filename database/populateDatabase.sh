#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"


DATABASE="aircmc"
USER="collin"

#psql -U $USER -d 'postgres' -c 'drop database aircmc;'
#psql -U $USER -d 'postgres' -c 'create database aircmc'

FILEPATH="$DIR/sampleData/"

#SCHEMA="$DIR/schema.sql"
#psql $DATABASE < $SCHEMA

# node $DIR/seed.js

#psql $DATABASE -c "COPY city FROM '$FILEPATH/cities.csv' CSV HEADER;"
#psql $DATABASE -c "COPY reservation_type FROM '$FILEPATH/reservationType.csv' CSV HEADER;"
#psql $DATABASE -c "COPY home FROM '$FILEPATH/houses.csv' CSV HEADER;"
#psql $DATABASE -c "COPY house_image FROM '$FILEPATH/houseImages.csv' CSV HEADER;"
psql $DATABASE -c "COPY activity FROM '$FILEPATH/activities.csv' CSV HEADER;"
psql $DATABASE -c "COPY activity_image FROM '$FILEPATH/activityImages.csv' CSV HEADER;"
