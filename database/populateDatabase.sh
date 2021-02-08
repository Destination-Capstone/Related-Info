#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"


DATABASE="aircmc"
TABLE1="home"
USER="collin"

psql -U $USER -d 'postgres' -c 'drop database aircmc;'
psql -U $USER -d 'postgres' -c 'create database aircmc'

FILEPATH="$DIR/sampleData/"

SCHEMA="$DIR/schema.sql"
psql $DATABASE < $SCHEMA

node $DIR/seed.js

#psql $DATABASE -c "COPY $TABLE1 FROM '$FILEPATH/cities.csv' CSV HEADER;"
