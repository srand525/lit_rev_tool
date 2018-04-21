import unittest
import requests
import json
import csv
import os
import requests


def ping_api(term,record_count,api_key):
    term_format = term.replace(" ","+")
    url = 'http://api.springer.com/metadata/json?q="{}"&p={}&api_key={}'.format(term_format,record_count,api_key)
    return url

def pull_results(url):
    results = requests.get(url).json()
    return results 

def search_properties(self):
    unique_id = helper.create_unique_id()
    now = datetime.datetime.now()
    time_stamp = now.strftime("%Y-%m-%d %H:%M")
    id_list = helper.id_run('fetch')
    run_fetch = self.pub_fetch(id_list)
    article_list = helper.xml_to_html(run_fetch,self.input_db)
    n_records_fetched = len(article_list)
    prop_dict = {'id':unique_id,'id_type':'fetch'
    ,'input_db':self.input_db,'record_count':n_records_fetched
    ,'run_date':time_stamp}
    return prop_dict

def main():
    pass


    url = ping_api(term,10,springer_api_key)
