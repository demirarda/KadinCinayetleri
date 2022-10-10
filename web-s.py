from re import I
from bs4 import BeautifulSoup
import requests
import pandas as pd
import json

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

with open('test.txt') as f:
    lines = f.read()
    linesArray = lines.split("\n")

data_set=[]
i=0
for val in linesArray:
    url = val
    req = requests.get(url, headers)
    soup = BeautifulSoup(req.content, 'html.parser')
    text = soup.get_text("**|**", strip=True)
    text_striped = text.split("**|**")
    baslik = []
    icerik = []
    my_dict={}
    counter = 0
    b=0
    for a in text_striped:
        if(a.count(":")==1 and a.count("http")==0):
            counter += 1
            if(counter != 1):
                icerik.append(" ")
            baslik.append(a)
        else:
            icerik.append(a)
            counter = 0
        b += 1
    c=0
    for deger in baslik:
        if(0 <= c < len(icerik)):
            my_dict[deger]= icerik[c]
        else:
            my_dict[deger]= ""
        c=c+1
    data_set.append(my_dict)
    print(my_dict)
    print("{} data added to array!".format(i))
    i=i+1

with open("data.json", "w", encoding='utf8') as outfile:
        json.dump(data_set, outfile, indent=4, separators=(',',': '), ensure_ascii=False)

    

