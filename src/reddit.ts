import * as types from './Types';
import fetch from 'node-fetch';
import fs from 'fs';

function pokeypokey() {

  fetch('https://old.reddit.com/r/all.json')
    .then( (res) => res.json() )
    .then( (data) => console.log("data=", JSON.stringify(data)) )
    .catch( (err: any) => console.error(err) );
}

//pokeypokey();

export function parseData() : Promise<types.Post []> {

  return new Promise( (resolve, reject) => {
    fs.readFile('./cache/2024-06-25-12-29.json', 'utf-8', (err, contents) => {
      if(err) {
        return reject(err);
      }

      const data = JSON.parse(contents)

      const postList = data.data.children
        .map( (node: any) => {
          // console.log("node=", node);
          // console.log('----');

          return {
            reddit_id:   node.data['id'],
            title:       node.data.title,
            link:        node.data.url,
            sub_reddit:  node.data.subreddit,
            date_posted: new Date(node.data.created_utc * 1000)
          }
        });

        resolve(postList);
    });
  });
}

/* async function test() {
  const posts = await parseData();

  console.log(posts);
} */

// test();

/*
  {
      approved_at_utc: null,
      subreddit: 'Damnthatsinteresting',
      selftext: '',
      author_fullname: 't2_10dadriegp',
      saved: false,
      mod_reason_title: null,
      gilded: 0,
      clicked: false,
      title: "17 year old 7'3 feet(2.20 meters) tall Chinese player Zhang Ziyu has just played her first international women's basketball game against Indonesia",
      link_flair_richtext: [],
      subreddit_name_prefixed: 'r/Damnthatsinteresting',
      hidden: false,
      pwls: 6,
      link_flair_css_class: 'video',
      downs: 0,
      thumbnail_height: 78,
      top_awarded_type: null,
      hide_score: false,
      name: 't3_1dnqpil',
      quarantine: false,
      link_flair_text_color: null,
      upvote_ratio: 0.94,
      author_flair_background_color: null,
      subreddit_type: 'public',
      ups: 18130,
      total_awards_received: 0,
      media_embed: {},
      thumbnail_width: 140,
      author_flair_template_id: null,
      is_original_content: false,
      user_reports: [],
      secure_media: [Object],
      is_reddit_media_domain: true,
      is_meta: false,
      category: null,
      secure_media_embed: {},
      link_flair_text: 'Video',
      can_mod_post: false,
      score: 18130,
      approved_by: null,
      is_created_from_ads_ui: false,
      author_premium: false,
      thumbnail: 'https://external-preview.redd.it/YnJoMTNhMGxsbDhkMbW-2ow0o-rv3XLv6HNA4BNaqGKu2enJVo3V0dx0GHW9.png?width=140&amp;height=78&amp;crop=140:78,smart&amp;format=jpg&amp;v=enabled&amp;lthumb=true&amp;s=6103563697584d387bfa040967c6f5be87ace771',
      edited: false,
      author_flair_css_class: null,
      author_flair_richtext: [],
      gildings: {},
      post_hint: 'hosted:video',
      content_categories: null,
      is_self: false,
      mod_note: null,
      created: 1719269052,
      link_flair_type: 'text',
      wls: 6,
      removed_by_category: null,
      banned_by: null,
      author_flair_type: 'text',
      domain: 'v.redd.it',
      allow_live_comments: true,
      selftext_html: null,
      likes: null,
      suggested_sort: null,
      banned_at_utc: null,
      url_overridden_by_dest: 'https://v.redd.it/33wy0x1ell8d1',
      view_count: null,
      archived: false,
      no_follow: false,
      is_crosspostable: false,
      pinned: false,
      over_18: false,
      preview: [Object],
      all_awardings: [],
      awarders: [],
      media_only: false,
      can_gild: false,
      spoiler: false,
      locked: false,
      author_flair_text: null,
      treatment_tags: [],
      visited: false,
      removed_by: null,
      num_reports: null,
      distinguished: null,
      subreddit_id: 't5_2xxyj',
      author_is_blocked: false,
      mod_reason_by: null,
      removal_reason: null,
      link_flair_background_color: null,
      id: '1dnqpil',
      is_robot_indexable: true,
      report_reasons: null,
      author: 'CryMoreFanboys',
      discussion_type: null,
      num_comments: 1194,
      send_replies: true,
      whitelist_status: 'all_ads',
      contest_mode: false,
      mod_reports: [],
      author_patreon_flair: false,
      author_flair_text_color: null,
      permalink: '/r/Damnthatsinteresting/comments/1dnqpil/17_year_old_73_feet220_meters_tall_chinese_player/',
      parent_whitelist_status: 'all_ads',
      stickied: false,
      url: 'https://v.redd.it/33wy0x1ell8d1',
      subreddit_subscribers: 15794677,
      created_utc: 1719269052,
      num_crossposts: 9,
      media: [Object],
      is_video: true
    }

*/