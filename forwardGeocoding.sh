#!/bin/bash

echo "Fetching location data"
input="./data/rawCities.csv"
echo "city,lat,long" > "./processed/result.csv" 

while IFS= read -r line
do
  echo "Processing $line"
  latt=$(curl "https://geocode.xyz/$line,Deutschland?region=DE&json=1" | jq -r '.latt')
  longt=$(curl "https://geocode.xyz/$line,Deutschland?region=DE&json=1" | jq -r '.longt')
  echo "$line,$latt,$longt" >> "./processed/result.csv" 
  
done < "$input"