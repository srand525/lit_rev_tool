from flask import Flask
from flask import jsonify
from flask import request, send_from_directory
from flask import abort, request, make_response, url_for
import psycopg2
import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import abort
from flask import make_response
import uuid
import logging

app = Flask(__name__, static_url_path='')

def connect_to_db():
    conn_string = "host='localhost' dbname= 'lit_rev' user='postgres' password='gres'"
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    return conn, cursor

# this function returns an object for one user
def u(user_id):
    con,cur = connect_to_db()
    query = """select distinct submitterid,firstname,lastname from public.usecase_submit where submitterid = {};""".format(user_id)
    cur.execute(query)
    args = cur.fetchall()[0]
    return {
        "type": "users",                    # It has to have type
        "id": args[0],                      # And some unique identifier
        "attributes": {
            "firstname":args[1],
            "lastname":args[2],
        },
    }

# routes for individual entities
@app.route('/api/users/<user_id>')
def users_by_id(user_id):
    return jsonify({"data": u(user_id)})


# route for all entities
@app.route('/api/users')
def users():
    con,cur = connect_to_db()
    query = """select distinct submitterid from public.usecase_submit;"""
    cur.execute(query)
    id_list = [a[0] for a in cur.fetchall()]
    return jsonify({
        "data": [u(i) for i in id_list]
        })

@app.route('/api/users', methods=['POST', 'OPTIONS'])
def create_user():
	# if request.get_json(silent=True) == None:
	# 	return jsonify(success=True)
    print('were here!')
    attrs = request.json
    args = (attrs['data']['attributes']['firstname'],attrs['data']['attributes']['lastname'])
    con,cur = connect_to_db()
    # insert_query = """INSERT INTO public.test_table
    # (firstname,lastname)
    # VALUES (%s, %s);"""
    insert_query = """INSERT INTO public.usecase_submit
    (firstname,lastname)
    VALUES (%s, %s);"""

    # insert_query = """INSERT INTO public.usecase_submit
    # (firstname,lastname)
    # VALUES (%s, %s);"""
    cur.execute(insert_query,args)
    con.commit()
    # print(attrs)
    print('we got this far')
    print(args)

#SUBMIT UC HERE######
# this function returns an object for one user
def uc(uc_id):
    con,cur = connect_to_db()
    query = """select distinct submitterid,firstname,lastname from public.usecase_submit where submitterid = {};""".format(uc_id)
    cur.execute(query)
    args = cur.fetchall()[0]
    return {
        "type": "usecases",                    # It has to have type
        "id": args[0],                      # And some unique identifier
        "attributes": {
            "info": args[2],
            # "info": 'data'+str(uc_id),

        },
    }

# routes for individual entities
@app.route('/api/usecases/<uc_id>')
def usecases_by_id(uc_id):
    return jsonify({"data": uc(uc_id)})


# route for all entities
@app.route('/api/usecases')
def usecases():
    print('in the use case fn')
    con,cur = connect_to_db()
    query = """select distinct submitterid from public.usecase_submit;"""
    cur.execute(query)
    id_list = [a[0] for a in cur.fetchall()]
    print('made it to the end')
    return jsonify({
        "data": [uc(i) for i in id_list]
        })
#
# @app.route('/api/usecases', methods=['POST', 'OPTIONS'])
# def create_usecase():
# 	# if request.get_json(silent=True) == None:
# 	# 	return jsonify(success=True)
#     print('were here!')
#     attrs = request.json
#     args = (attrs['data']['attributes']['firstname'],attrs['data']['attributes']['lastname'])
#     con,cur = connect_to_db()
#     # insert_query = """INSERT INTO public.test_table
#     # (firstname,lastname)
#     # VALUES (%s, %s);"""
#     insert_query = """INSERT INTO public.usecase_submit
#     (firstname,lastname)
#     VALUES (%s, %s);"""
#
#     # insert_query = """INSERT INTO public.usecase_submit
#     # (firstname,lastname)
#     # VALUES (%s, %s);"""
#     cur.execute(insert_query,args)
#     con.commit()
#     # print(attrs)
#     print('we got this far')
#     print(args)
#end use case





# def title(query_term):
#     con,cur = connect_to_db()
#     title_query = """SELECT distinct e.pullsource,c.title, c.journalname, c.publicationdate, c.pubtype
#     from public.datapull_detail as a inner join public.datapull_uniqueid as b on a.pullsource = b.pullsource AND
#     a.associatedid = b.associatedid inner join public.datapull_title as c on b.uniqueid = c.uniqueid
#     inner join public.datapull_id as e on e.pullid = a.pullid where e.pullquery = '{}' """.format(query_term)
#     cur.execute(title_query)
#     title_returns = cur.fetchall()
#     title_dict_list = []
#     for t in enumerate(title_returns):
#         title_dict = {}
#         pubtype_a = t[1][4].replace("}","").replace("{","")
#         pubtype = pubtype_a.replace("''","").replace('"',"").replace(",",", ")
#         title = t[1][1]
#         pubdatetime = t[1][3]
#         pubdate = pubdatetime.strftime("%Y-%m-%d")
#         if title != '':
#             title_dict = {
#             "type": "titles",
#             "id": t[0],
#             "attributes": {"pubsource":t[1][0],"title":t[1][1],"journalname": t[1][2],"pubdate":pubdate,"pubtype":pubtype}}
#             title_dict_list.append(title_dict)
#     return title_dict_list

# # this function returns an object for one user
def query_run(query_id):
    con,cur = connect_to_db()
    query = """SELECT distinct pullid,pullquery,pulldate,pullsource,pullby from public.datapull_id where pullid = {} """.format(query_id)
    query_name_run = cur.execute(query)
    query_name = cur.fetchall()[0]
    return {
        "type": "queries",                    # It has to have type
        "id": query_name[0],                      # And some unique identifier
        "attributes": {                     # Here goes actual payload.
            "term": query_name[1],
            "pullid": query_name[0],
            "pulldate": query_name[2],
            "pullsource":query_name[3],
            "pullby":query_name[4] # the only data we have for each user is "info" field
        },
    }


# # route for all entities
@app.route('/api/queries',methods = ['GET'])
def queries():
    con,cur = connect_to_db()
    query = """SELECT distinct pullid as max_pullid from public.datapull_id"""
    query_name_run = cur.execute(query)
    id_list = [a[0] for a in cur.fetchall()]
    q_list = []
    for i in id_list:
        q_hist = query_run(i)
        q_list.append(q_hist)
    return jsonify({
        "data": q_list
        })
# routes for individual entities
@app.route('/api/queries/<query_id>',methods = ['GET'])
def queries_by_id(query_id):
    return jsonify({"data": query_run(query_id)})


@app.route('/')
def root():
    return send_from_directory('static', "index.html")
#
# route for other static files
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('', path)
#
#
# if __name__ == '__main__':
#     print("use\n"
#           "FLASK_APP=dummy.py python -m flask run\n"
#           "instead")
#     exit(1)
#
# #
if __name__ == '__main__':
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
