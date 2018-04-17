import json
import string
import datetime
from datetime import date
import pickle
import random
import pandas as pd
import helper

# parse_list_fetch = helper.id_run('parse')
# parse_list_fetch.head()

def pull_id(cur,con, input_term,input_db):
    id_ins = """INSERT INTO public.datapull_id
    (pulldate, pullname, pullquery, pulltype, pullsource, pullby)
    VALUES (%s, %s,%s,%s,%s,%s);
    select currval('datapull_id_pullid_seq');"""
    pull_date = datetime.datetime.now().strftime('%m/%d/%Y %I:%M:%S %p')
    pull_name = 'test_runs'
    pull_query = input_term
    pull_type = 'keyword' #keyword/ author
    pull_source = input_db.upper()
    pull_by = 'Sophie'
    id_args = (pull_date,pull_name,pull_query,pull_type,pull_source,pull_by)
    cur.execute(id_ins,id_args)
    cur_id_tup = cur.fetchall()
    cur_id = cur_id_tup[0][0]
    con.commit()
    return cur_id, cur_id_tup

def pull_detail(cur,con,current_id_tup,current_id,parse_df):

    #get existing unique ids (combo of pullsource and associatedid)
    cur.execute("SELECT pullsource, associatedid from public.datapull_detail")
    unique_id_list = cur.fetchall()

    #get pullsource for this pull
    cur.execute("""SELECT pullsource from public.datapull_id  as a where a.pullid = %s""",cur_id_tup)
    pull_source = cur.fetchall()[0][0]

    detail_ins = """INSERT INTO public.datapull_detail(
    pullid, pullsource, associatedid, valuestore, note, optionalid01, optionalid02)
    VALUES (%s, %s, %s, %s, %s, %s, %s);"""

    note = None
    values_list = []

    for index, row in parse_df.iterrows():
        pull_id = cur_id
        associated_id = row['associatedId']
        associated_id_int = int(associated_id)
        optional_id_1 = row['optionalId01']
        optional_id_2 = row['optionalId02']


    cur.execute("""SELECT pullsource from public.datapull_id  as a where a.pullid = %s""",current_id_tup)
    db_source = cur.fetchall()[0][0]
    associated_id = 'hello i am a test'
    value_store = None
    note = None
    pub_type = None
    optional_id_1 = None
    optional_id_2 = None
    detail_args = (current_id, db_source,associated_id,value_store,note,pub_type,optional_id_1,optional_id_2)
    cur.execute(detail_ins,detail_args)
    con.commit()
