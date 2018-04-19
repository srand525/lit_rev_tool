import NCBIFetch
import NCBISearch
import PMCParse
import PUBMEDParse
import NCBIPush
import helper
import importlib
importlib.reload(helper)
importlib.reload(NCBISearch)


def main_search(input_term,input_db,email_id,cur):

    search_inst = NCBISearch.ncbi_search(input_term,input_db,email_id)

    record_count = search_inst.pub_count()

    id_list_all = search_inst.pub_search(record_count)

    id_list = helper.filter_ids(input_db,id_list_all,cur)

    prop_dict = search_inst.search_properties(record_count)

    unique_id = prop_dict['id']

    helper.serialize_output(unique_id,id_list)

    helper.update_id_json(prop_dict)

def main_fetch(input_db,email_id):

    fetch_inst = NCBIFetch.ncbi_fetch(input_db,email_id)

    id_list_fetch = helper.id_run('search')

    doc_list = fetch_inst.pub_fetch(id_list_fetch)

    prop_dict = fetch_inst.search_properties()

    unique_id = prop_dict['id']

    helper.serialize_output(unique_id,doc_list)

    helper.update_id_json(prop_dict)

def main_push(input_term,cur,con):
    # con,cur  = helper.connect_to_db()
    parse_df = helper.id_run('parse')
    cur_id,cur_id_tup = NCBIPush.push_id(cur,con,input_term,parse_df)
    new_data = NCBIPush.push_detail(cur,con,parse_df,cur_id,cur_id_tup)
    NCBIPush.push_unique_id(cur,con,new_data)
    full_df = NCBIPush.merge_ids(cur,con,new_data)
    NCBIPush.push_title(cur,con,full_df)
    NCBIPush.push_author(cur,con,full_df)
    NCBIPush.push_keyword(cur,con,full_df)
    NCBIPush.push_text(cur,con,full_df)

def main(input_term,input_db,email_id,cur,con):
    main_search(input_term,input_db,email_id,cur)
    main_fetch(input_db,email_id)
    if input_db == 'pmc':
        PMCParse.main()
    if input_db == 'pubmed':
        PUBMEDParse.main()
    main_push(input_term,cur,con)

if __name__ == '__main__':
    main(input_term,input_db,email_id)
