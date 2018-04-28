import NCBIFetch
import NCBISearch
import PMCParse
import PUBMEDParse
import NCBIPush
import helper
import importlib
import SpringerFetch
import SpringerParse
import SpringerPush
importlib.reload(helper)
importlib.reload(SpringerFetch)
importlib.reload(SpringerParse)
importlib.reload(SpringerPush)
importlib.reload(NCBISearch)


def main_search(input_term,input_db,email_id,cur):
    if input_db in ('pmc','pubmed'):
        search_inst = NCBISearch.ncbi_search(input_term,input_db,email_id)

        record_count = search_inst.pub_count()

        id_list_all = search_inst.pub_search(record_count)

        id_list = helper.filter_ids(input_db,id_list_all,cur)

        prop_dict = search_inst.search_properties(record_count)

        unique_id = prop_dict['id']

        helper.serialize_output(unique_id,id_list)

        helper.update_id_json(prop_dict)

def main_fetch(input_db,input_term, email_id,api_key):
    if input_db in ('pmc','pubmed'):

        fetch_inst = NCBIFetch.ncbi_fetch(input_db,email_id)

        id_list_fetch = helper.id_run('search',input_db)

        doc_list = fetch_inst.pub_fetch(id_list_fetch)

        prop_dict = fetch_inst.search_properties()

        unique_id = prop_dict['id']

        helper.serialize_output(unique_id,doc_list)

        helper.update_id_json(prop_dict)

    if input_db == 'springer':

        springer_fetch_inst = SpringerFetch.springer_fetch(input_term,api_key)

        url = springer_fetch_inst.ping_api()

        results,record_count = springer_fetch_inst.pull_results(url)

        prop_dict = springer_fetch_inst.search_properties(record_count)

        unique_id = prop_dict['id']

        helper.serialize_output(unique_id,results['records'])

        helper.update_id_json(prop_dict)


def main_push(input_term,input_db,cur,con):
    if input_db in ('pmc','pubmed'):
        parse_df = helper.id_run('parse',input_db)
        if len(parse_df.index) > 0:
            cur_id,cur_id_tup = NCBIPush.push_id(cur,con,input_term,parse_df)
            new_data = NCBIPush.push_detail(cur,con,parse_df,cur_id,cur_id_tup)
            NCBIPush.push_unique_id(cur,con,new_data)
            full_df = NCBIPush.merge_ids(cur,con,new_data)
            NCBIPush.push_title(cur,con,full_df)
            NCBIPush.push_author(cur,con,full_df)
            NCBIPush.push_keyword(cur,con,full_df)
            NCBIPush.push_text(cur,con,full_df)
    if input_db == 'springer':
        parse_df = helper.id_run('parse','springer')
        if len(parse_df.index) > 0:
            cur_id,cur_id_tup = SpringerPush.push_id(cur,con,input_term,parse_df)
            new_data = SpringerPush.push_detail(cur,con,parse_df,cur_id,cur_id_tup)
            SpringerPush.push_unique_id(cur,con,new_data)
            full_df = SpringerPush.merge_ids(cur,con,new_data)
            SpringerPush.push_title(cur,con,full_df)
            SpringerPush.push_author(cur,con,full_df)
            SpringerPush.push_keyword(cur,con,full_df)
            SpringerPush.push_text(cur,con,full_df)

def main(input_term,input_db,email_id,api_key,cur,con):
    main_search(input_term,input_db,email_id,cur)
    main_fetch(input_db,input_term, email_id,api_key)
    if input_db == 'pmc':
        PMCParse.main()
    if input_db == 'pubmed':
        PUBMEDParse.main()
    if input_db == 'springer':
        SpringerParse.main()
    main_push(input_term,input_db,cur,con)

if __name__ == '__main__':
    main(input_term,input_db,email_id)
