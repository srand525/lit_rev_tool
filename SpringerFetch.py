import unittest
import requests
import json
import csv
import os
import requests
import helper
import datetime


class springer_fetch:
    def __init__(self,term,api_key):
        self.term = term
        self.api_key = api_key


    def ping_api(self, record_count = 100):
        term_format = self.term.replace(" ","+")
        url = 'http://api.springer.com/metadata/json?q=(type:Journal AND "{}")&p={}&api_key={}'.format(term_format,record_count,self.api_key)
        return url

    def pull_results(self,url):
        results = requests.get(url).json()
        record_count = len(results['records'])
        return results,record_count

    def search_properties(self,record_count):
        unique_id = helper.create_unique_id()
        now = datetime.datetime.now()
        time_stamp = now.strftime("%Y-%m-%d %H:%M")
        n_records_fetched = record_count
        prop_dict = {'id':unique_id,'id_type':'fetch'
        ,'input_db':'springer','record_count':n_records_fetched
        ,'run_date':time_stamp}
        return prop_dict
