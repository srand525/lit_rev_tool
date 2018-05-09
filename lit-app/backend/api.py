from flask import Flask
from flask import jsonify
from flask import request, send_from_directory
import psycopg2

app = Flask(__name__, static_url_path='')

def connect_to_db():
    conn_string = "host='localhost' dbname= 'lit_rev' user='postgres' password='gres'"
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    return conn, cursor


def title(query_term):
    con,cur = connect_to_db()
    # title_query = """SELECT distinct e.pullid,e.pullquery, e.pullby, c.title, c.pubyear from public.datapull_detail as a inner join public.datapull_uniqueid as b on a.pullsource = b.pullsource AND a.associatedid = b.associatedid inner join public.datapull_title as c on b.uniqueid = c.uniqueid inner join public.datapull_text as d on b.uniqueid = d.uniqueid inner join public.datapull_id as e on e.pullid = a.pullid where e.pullquery = '{}' """.format(query_term)
    # title_query = """SELECT distinct e.pullid,e.pullquery, e.pullby, c.title, c.pubyear from public.datapull_detail as a inner join public.datapull_uniqueid as b on a.pullsource = b.pullsource AND a.associatedid = b.associatedid inner join public.datapull_title as c on b.uniqueid = c.uniqueid inner join public.datapull_text as d on b.uniqueid = d.uniqueid inner join public.datapull_id as e on e.pullid = a.pullid where e.pullquery = '{}' """.format(query_term)
    title_query = """SELECT distinct e.pullsource,c.title, c.journalname, c.publicationdate, c.pubtype from public.datapull_detail as a inner join public.datapull_uniqueid as b on a.pullsource = b.pullsource AND a.associatedid = b.associatedid inner join public.datapull_title as c on b.uniqueid = c.uniqueid inner join public.datapull_id as e on e.pullid = a.pullid where e.pullquery = '{}' """.format(query_term)
    cur.execute(title_query)
    title_returns = cur.fetchall()
    title_dict_list = []
    for t in enumerate(title_returns):
        title_dict = {}
        pubtype_a = t[1][4].replace("}","").replace("{","")
        pubtype = pubtype_a.replace("''","").replace('"',"").replace(",",", ")
        title = t[1][1]
        pubdatetime = t[1][3]
        pubdate = pubdatetime.strftime("%Y-%m-%d")
        if title != '':
            title_dict = {
            "type": "titles",
            "id": t[0],
            "attributes": {"pubsource":t[1][0],"title":t[1][1],"journalname": t[1][2],"pubdate":pubdate,"pubtype":pubtype}}
            title_dict_list.append(title_dict)
    return title_dict_list

@app.route('/api/titles')
def titles():
    print('somethings happening')
    con,cur = connect_to_db()
    term_query = """SELECT distinct pullquery, pullsource from public.datapull_id"""
    cur.execute(term_query)
    term_list_fetch = cur.fetchall()
    term_list = [b[0] for b in term_list_fetch]
    title_result_all = [title(i) for i in term_list]
    flatten = lambda l: [item for sublist in l for item in sublist]
    title_result = flatten(title_result_all)
    return jsonify({
        "data": title_result
        })

# routes for individual entities
@app.route('/api/titles/<query_term>')
def titles_by_term(query_term):
    return jsonify({"data": title(query_term)})


# this function returns an object for one user
def q(query_id):
    con,cur = connect_to_db()
    query = """SELECT distinct pullid,pullquery,pulldate,pullsource,pullby from public.datapull_id where pullid = {} """.format(query_id)
    query_name_run = cur.execute(query)
    query_name = cur.fetchall()[0]
    return {
        "type": "queries",                    # It has to have type
        "id": query_name[0],                      # And some unique identifier
        "attributes": {                     # Here goes actual payload.
            # "info": "data" + str(user_id),  # the only data we have for each user is "info" field
            "term": query_name[1],
            "pullid": query_name[0],
            "pulldate": query_name[2],
            "pullsource":query_name[3],
            "pullby":query_name[4] # the only data we have for each user is "info" field
        },
    }

# route for all entities
@app.route('/api/queries')
def queries():
    con,cur = connect_to_db()
    query = """SELECT max(pullid) as max_pullid from public.datapull_id"""
    query_name_run = cur.execute(query)
    max_pullid = cur.fetchall()[0][0]+1
    q_list = []
    for i in list(range(1,max_pullid)):
        try:
            q_hist = q(i)
            q_list.append(q_hist)
        except:
            pass
    return jsonify({
        "data": q_list
        })
    # return jsonify({
    #     "data": [q(i) for i in list(range(1,6))]
    #     })

# routes for individual entities
@app.route('/api/queries/<query_id>')
def queries_by_id(query_id):
    return jsonify({"data": q(query_id)})

@app.route('/')
def root():
    return send_from_directory('static', "index.html")

# route for other static files
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('', path)


if __name__ == '__main__':
    print("use\n"
          "FLASK_APP=dummy.py python -m flask run\n"
          "instead")
    exit(1)
