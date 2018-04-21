
new_results = helper.id_run('fetch')

def parse_springer(article):
    title = article['title']
    optionalId01 = article['doi']
    d = {}


    # d = {
    #     'title':title,
    #     'associatedId': id_dict['pmc'],
    #     'author': auth_dict_list,
    #     'journalName' : journal_dict['journal-title'],
    #     'journalISO':journal_dict['journal-id'],
    #     'pubtype': pub_type_list,
    #     'publishdate':dates_dict_list[0],
    #     'publishdatefull':dates_dict_list[1],
    #     'meshterms': kwd_dict_list,
    #     'abstract':abs_dict_list,
    #     'optionalId01' :optionalId01,
    #     'optionalId02': optionalId02,
    #     'pullsource': 'pmc'
    # }

    return d

def parse_all(article_list):
  article_dict_list = []
  for art in article_list:
    try:
        d = parse_springer(art)
        article_dict_list.append(d)
    except:
        pass
  parsed_df = pd.DataFrame(article_dict_list)
  return parsed_df

def parse_properties(parsed_df):
    unique_id = helper.create_unique_id()
    now = datetime.datetime.now()
    time_stamp = now.strftime("%Y-%m-%d %H:%M")
    n_records_parsed = len(parsed_df.index)
    prop_dict = {'id':unique_id,'id_type':'parse'
    ,'input_db':'pmc','record_count':n_records_parsed
    ,'run_date':time_stamp}
    return prop_dict

def main():
    full_doc = helper.id_run('fetch')
    article_list = helper.xml_to_html(full_doc,'pmc')
    parsed_df = parse_all(article_list)
    prop_dict = parse_properties(parsed_df)
    unique_id = prop_dict['id']
    helper.serialize_output(unique_id,parsed_df)
    helper.update_id_json(prop_dict)
