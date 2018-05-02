import json
import string
import datetime
from datetime import date
import pickle
import random
import pandas as pd
import helper
pd.options.mode.chained_assignment = None

def push_id(cur,con,input_term,parse_df,pull_requestor):
    id_ins = """INSERT INTO public.datapull_id
    (pulldate, pullname, pullquery, pulltype, pullsource, pullby)
    VALUES (%s, %s,%s,%s,%s,%s);
    select currval('datapull_id_pullid_seq');"""
    pull_date = datetime.datetime.now().strftime('%m/%d/%Y %I:%M:%S %p')
    pull_name = 'test_runs'
    pull_query = input_term
    pull_type = 'keyword' #keyword/ author
    pull_source = parse_df.pullsource.unique().item()
    # pull_by = 'Sophie'
    pull_by = pull_requestor
    id_args = (pull_date,pull_name,pull_query,pull_type,pull_source,pull_by)
    cur.execute(id_ins,id_args)
    cur_id_tup = cur.fetchall()
    cur_id = cur_id_tup[0][0]
    con.commit()
    return cur_id, cur_id_tup

def push_detail(cur,con,parse_df,current_id,current_id_tup):

    #get existing unique ids (combo of pullsource and associatedid)
    cur.execute("SELECT pullsource, associatedid from public.datapull_detail")
    unique_id_list = cur.fetchall()

    #get pullsource for this pull
    # cur.execute("""SELECT pullsource from public.datapull_id  as a where a.pullid = %s""",current_id_tup)
    # pull_source = cur.fetchall()[0][0]

    detail_ins = """INSERT INTO public.datapull_detail(
    pullid, pullsource, associatedid, valuestore, note, optionalid01, optionalid02)
    VALUES (%s, %s, %s, %s, %s, %s, %s);"""

    pull_source = 'springer'
    note = None
    values_list = []
    new_data_df = parse_df
    for index, row in new_data_df.iterrows():
        pull_id = current_id
        associated_id = row['associatedId']
        # associated_id_int = int(associated_id)
        optional_id_1 = row['optionalId01']
        optional_id_2 = row['optionalId02']
        if (pull_source,associated_id) in unique_id_list:
            value_store = 'duplicate'
            new_data_df.drop(index, inplace = True)
        else:
            value_store = 'store'

        values_list.append((pull_id,pull_source,associated_id,value_store,note,optional_id_1,optional_id_2))

    cur.executemany(detail_ins,values_list)
    con.commit()
    return new_data_df

def push_unique_id(cur,con,new_data_df):
    unique_id_ins = """INSERT INTO public.datapull_uniqueid(
    associatedid, pullsource)
    VALUES (%s, %s);
    select currval('datapull_uniqueid_uniqueid_seq');"""
    values_list = []
    for index, row in new_data_df.iterrows():
        associated_id = row['associatedId']
        pull_source = row['pullsource']
        values_list.append((associated_id,pull_source))
    cur.executemany(unique_id_ins,values_list)
    con.commit()

def merge_ids(cur,con,new_data_df):
    cur.execute("SELECT * FROM public.datapull_uniqueid")
    uniqueid_tuples = cur.fetchall()
    unique_id_df = pd.DataFrame(uniqueid_tuples)
    unique_id_df.columns = ['uniqueid','associatedid','pullsource']
    full_unique_id_df = unique_id_df.merge(new_data_df, how = 'inner',left_on = ['associatedid','pullsource'],right_on = ['associatedId','pullsource'])
    return full_unique_id_df

def push_title(cur,con,full_data_df):
    title_ins = """INSERT INTO public.datapull_title(
    uniqueid,title, journalname, journaliso, pubtype, publicationdate, pubday, pubmonth, pubyear)
    VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s);"""

    values_list = []
    for index, row in full_data_df.iterrows():
        unique_id = row['uniqueid']
        title = row['title']
        journal_name = row['journalName']
        journal_iso = row['journalISO']
        pub_type = row['pubtype']
        publication_date = row['publishdatefull']
        date_format = datetime.datetime.strptime(publication_date, '%Y-%m-%d')
        try:
            pub_day = date_format.day
        except:
            pub_day = None
        try:
            pub_month = date_format.month
        except:
            pub_month = None
        try:
            pub_year = date_format.year
        except:
            pub_year = None

        values_list.append((unique_id,title,journal_name,journal_iso,pub_type,publication_date,pub_day,pub_month,pub_year))

    cur.executemany(title_ins,values_list)
    con.commit()

def push_author(cur,con,full_data_df):
    auth_ins = """INSERT INTO public.datapull_author(
	uniqueid, forename, lastname, contributortype, contributorcontact, affiliation)
	VALUES (%s, %s, %s, %s, %s, %s);"""
    values_list = []

    for index, row in full_data_df.iterrows():
        contributor_type = None
        contributor_contact = None
        unique_id = row['uniqueid']
        auth_count = 0
        if row['author'] is not None:
            for auth in row['author']:
                auth_count += 1
                if auth_count < 4:
                    values_list.append((unique_id, auth['fname'], auth['lname'], contributor_type,contributor_contact,auth['affl']))
                else:
                    break

    cur.executemany(auth_ins,values_list)
    con.commit()

def push_keyword(cur,con,full_data_df):
    key_ins = """INSERT INTO public.datapull_keyword(
	uniqueid, keywordvalue, category1, category2, category3, category4, category5)
	VALUES (%s, %s, %s, %s, %s, %s, %s);"""
    values_list = []
    for index,row in full_data_df.iterrows():
        unique_id = row['uniqueid']
        if row['meshterms'] == []:
            num_of_qualifiers = 0
        if row['meshterms'] != []:
            for word in row['meshterms']:
                print(word)
                keywordvalue = word['descriptorname']
                try:
                    num_of_qualifiers = len(word['qualifiername'])
                except:
                    num_of_qualifiers = 0

                if num_of_qualifiers > 5:
                    num_of_Nones = 0
                    word['qualifiername'] = word['qualifiername'][:5]
                else:
                    num_of_Nones = 5 - num_of_qualifiers

    #             #if there are qualifier names, the list should not be 0
        if num_of_qualifiers != 0:
            values_list.append(([unique_id,keywordvalue] + word['qualifiername'] + [None]*num_of_Nones))
        else:
            values_list.append((unique_id, None, None, None, None, None, None))

    if values_list!=[]:
        cur.executemany(key_ins, values_list)
        con.commit()

def push_text(cur,con,full_data_df):
    text_ins = """INSERT INTO public.datapull_text(
	uniqueid, nlmcategory, label, abstracttext)
	VALUES (%s, %s, %s, %s);"""
    values_list = []
    for index,row in full_data_df.iterrows():
        unique_id = row['uniqueid']
        if row['abstract'] is not None:
            nlmcategory = None
            label = None
            abstracttext = row['abstract']
        if row['abstract'] is None:
            abstracttext = None
        values_list.append((unique_id,nlmcategory,label,abstracttext))
    if values_list!=[]:
        cur.executemany(text_ins, values_list)
        con.commit()
