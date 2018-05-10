from flask import Flask
from flask import jsonify
from flask import request, send_from_directory
from flask import abort, request, make_response, url_for
import psycopg2

app = Flask(__name__, static_url_path='')

def connect_to_db():
    conn_string = "host='localhost' dbname= 'lit_rev' user='postgres' password='gres'"
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    return conn, cursor

def title(query_term):
    con,cur = connect_to_db()
    title_query = """SELECT distinct e.pullsource,c.title, c.journalname, c.publicationdate, c.pubtype
    from public.datapull_detail as a inner join public.datapull_uniqueid as b on a.pullsource = b.pullsource AND
    a.associatedid = b.associatedid inner join public.datapull_title as c on b.uniqueid = c.uniqueid
    inner join public.datapull_id as e on e.pullid = a.pullid where e.pullquery = '{}' """.format(query_term)
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


# this function returns an object for one user
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


@app.route('/api/titles',methods = ['GET'])
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
@app.route('/api/titles/<query_term>',methods = ['GET'])
def titles_by_term(query_term):
    return jsonify({"data": title(query_term)})

# route for all entities
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

# @app.route('/api/submit',methods=['POST'])
@app.route('/api/submits',methods = ['POST'])
def submit():
    language = request.get('text') #if key doesn't exist, returns None
    # language = request.form('text') #if key doesn't exist, returns None
    return jsonify({'data':language})
    # return '''<h1>The language value is: {}</h1>'''.format(language)
    # name = request.form.get['text']
    # print(name)
    # print('gangs all here')
    # return name

    # return {
    #     "type": "queries",                    # It has to have type
    #     "id": 1,                      # And some unique identifier
    #     "attributes": {                     # Here goes actual payload.
    #         "text": _name
    #     },
    # }
    # return jsonify({"data": _name})
	# _email = request.form['inputEmail']
	# _password = request.form['inputPassword']

# @app.route("/addCCRelationship",methods=['GET', 'POST'])
# def addCCRelationship():
#     print('in add relationship component component')
#     # read the posted values from the UI
#     parent_component = request.form.get('parent_component_component')
#     child_component = request.form.get('child_component')
#     #push the ingredient and components
#     push_new_component(parent_component)
#     push_new_component(child_component)
#     #now push the relationship
#     push_cc_relationship(parent_component,child_component)
#     a_string = parent_component + ' includes: ' + child_component
#     return a_string
#


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
