import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import InfoIcon from '@material-ui/icons/Info';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import moment from 'moment';

const styles = {
  indigoText: {
    color: indigo[500],
    backgroundColor: 'transparent'
  },
  redText: {
    color: red[500],
    backgroundColor: 'transparent'
  },
  yellowText: {
    color: yellow[500],
    backgroundColor: 'transparent'
  },
  defaultText: {
    backgroundColor: 'transparent',
    color: 'inherit'
  }
};

const notifications = [
  {
    "id": 14,
    "sender": {
        "id": 1,
        "username": "Henry Anderson",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "receiver": {
        "id": 1,
        "username": "Daniel Keith",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "noti_type": "CUSTOMER",
    "created": "2018-12-15T13:43:42.013885Z",
    "is_read": false,
    "content": "Henry Anderson ordered Basketball, name: Basketball, price: 100.0, amount: 2, total:200.00",
    "json_info": "{\"item_id\": 1, \"order_item_id\": 39, \"buyer_id\": 1}"
  },
  {
    "id": 15,
    "sender": {
        "id": 1,
        "username": "Ron Bruck",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "receiver": null,
    "noti_type": "SYSTEM",
    "created": "2018-12-15T13:43:42.013885Z",
    "is_read": false,
    "content": "Ron Bruck request to become a seller",
    "json_info": null
  },
  {
    "id": 14,
    "sender": {
        "id": 1,
        "username": "Henry Anderson",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "receiver": {
        "id": 1,
        "username": "Daniel Keith",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "noti_type": "CUSTOMER",
    "created": "2018-12-15T13:43:42.013885Z",
    "is_read": false,
    "content": "Henry Anderson ordered Basketball, name: Basketball, price: 100.0, amount: 2, total:200.00",
    "json_info": "{\"item_id\": 1, \"order_item_id\": 39, \"buyer_id\": 1}"
  },
  {
    "id": 14,
    "sender": {
        "id": 1,
        "username": "Henry Anderson",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "receiver": {
        "id": 1,
        "username": "Daniel Keith",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "noti_type": "CUSTOMER",
    "created": "2018-12-15T13:43:42.013885Z",
    "is_read": false,
    "content": "Henry Anderson ordered Basketball, name: Basketball, price: 100.0, amount: 2, total:200.00",
    "json_info": "{\"item_id\": 1, \"order_item_id\": 39, \"buyer_id\": 1}"
  },
  {
    "id": 14,
    "sender": {
        "id": 1,
        "username": "Henry Anderson",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "receiver": {
        "id": 1,
        "username": "Daniel Keith",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "noti_type": "CUSTOMER",
    "created": "2018-12-15T13:43:42.013885Z",
    "is_read": false,
    "content": "Henry Anderson ordered Basketball, name: Basketball, price: 100.0, amount: 2, total:200.00",
    "json_info": "{\"item_id\": 1, \"order_item_id\": 39, \"buyer_id\": 1}"
  },
  {
    "id": 14,
    "sender": {
        "id": 1,
        "username": "Henry Anderson",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "receiver": {
        "id": 1,
        "username": "Daniel Keith",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "noti_type": "CUSTOMER",
    "created": "2018-12-15T13:43:42.013885Z",
    "is_read": false,
    "content": "Henry Anderson ordered Basketball, name: Basketball, price: 100.0, amount: 2, total:200.00",
    "json_info": "{\"item_id\": 1, \"order_item_id\": 39, \"buyer_id\": 1}"
  },
  {
    "id": 14,
    "sender": {
        "id": 1,
        "username": "Henry Anderson",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "receiver": {
        "id": 1,
        "username": "Daniel Keith",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "noti_type": "CUSTOMER",
    "created": "2018-12-15T13:43:42.013885Z",
    "is_read": false,
    "content": "Henry Anderson ordered Basketball, name: Basketball, price: 100.0, amount: 2, total:200.00",
    "json_info": "{\"item_id\": 1, \"order_item_id\": 39, \"buyer_id\": 1}"
  },
  {
    "id": 14,
    "sender": {
        "id": 1,
        "username": "Henry Anderson",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "receiver": {
        "id": 1,
        "username": "Daniel Keith",
        "email": "",
        "seller_status": "NONE",
        "user_status": "ACTIVE"
    },
    "noti_type": "CUSTOMER",
    "created": "2018-12-15T13:43:42.013885Z",
    "is_read": false,
    "content": "Henry Anderson ordered Basketball, name: Basketball, price: 100.0, amount: 2, total:200.00",
    "json_info": "{\"item_id\": 1, \"order_item_id\": 39, \"buyer_id\": 1}"
  },
];

const date = Date.now();

function getUnreadNotifications() {
  let tmp = [];
  notifications.map((noti, index) => {
    if (noti.is_read == false) {
      tmp.push(noti);
    }
  });
  return tmp;
}

function filterNotifications() {
  let tmp_notifications = [];

  notifications.map((noti, index) => {
    if (noti.noti_type == 'CUSTOMER') {
      tmp_notifications.push(
        {
          avatar: <Avatar style={{...styles.redText}}><LocalOfferIcon /></Avatar>,
          title: 'Order',
          subtitle: noti.content,
          created: noti.created
        }
      );
    }
    else if (noti.noti_type == 'SYSTEM') {
      tmp_notifications.push(
        {
          avatar: <Avatar style={{...styles.indigoText}}><PeopleIcon /></Avatar>,
          title: 'Order',
          subtitle: noti.content,
          created: noti.created
        }
      ); 
    }
  });

  return tmp_notifications;
}

export default {
	mockProducts: [
		{
		    "id": 1,
		    "item_name": "T-shirts",
		    "category": {
		        "id": 2,
		        "name": "category_2",
		        "children": [
		            {
		                "id": 8,
		                "name": "category_1_1",
		                "children": [],
		                "parent": 1
		            }
		        ],
		        "parent": null
		    },
		    "store": {
		        "id": 1,
		        "store_name": "Veranda PS",
		        "category": {
		            "id": 1,
		            "name": "Premium shops",
		            "children": [
		                {
		                    "id": 8,
		                    "name": "category_1_1",
		                    "children": [],
		                    "parent": 1
		                }
		            ],
		            "parent": null
		        },
		        "owner": {
		            "id": 1,
		            "username": "seller",
		            "email": "",
		            "seller_status": "NONE",
		            "user_status": "ACTIVE"
		        },
		        "description": "This is store description",
		        "reviews": 0,
		        "score": 0
		    },
		    "reviews": [
		    	{
		    		"id": 1,
		    		"user" : {
		    			"id": 1,
		    			"username": "Smith",
		    			"email": "",
		    			"user_status": "ACTIVE"
		    		},
		    		"content": "I want to do something after i submit the node. How can i do that? i use hook_form_form_id_alter(),but i dont know how to use."
		    	},
		    	{
		    		"id": 2,
		    		"user" : {
		    			"id": 2,
		    			"username": "Paul",
		    			"email": "",
		    			"user_status": "ACTIVE"
		    		},
		    		"content": "On Drupal 7 when I post a node I redirect to the specific node created. I'm searching to redirect to the main admin page when I post correctly the node. I've tried to put this on template.php: function node_submit"
		    	}
		    ],
		    "description": "this is good item",
		    "price": 100,
		    "amount": 10,
		    "rating": 2
		},
		{
		    "id": 2,
		            "name": "Premium shops",
		    "item_name": "item2",
		    "category": {
		        "id": 1,
		        "name": "category_4",
		        "children": [
		            {
		                "id": 8,
		                "name": "category_1_1",
		                "children": [],
		                "parent": 1
		            }
		        ],
		        "parent": null
		    },
		    "store": {
		        "id": 2,
		        "store_name": "store2",
		        "category": {
		            "id": 1,
		            "name": "category_4",
		            "children": [
		                {
		                    "id": 8,
		                    "name": "category_1_1",
		                    "children": [],
		                    "parent": 1
		                }
		            ],
		            "parent": null
		        },
		        "owner": {
		            "id": 1,
		            "username": "seller",
		            "email": "",
		            "seller_status": "NONE",
		            "user_status": "ACTIVE"
		        },
		        "description": "This is store description",
		        "reviews": 0,
		        "score": 0
		    },
		    "reviews": [
		    	{
		    		"id": 3,
		    		"user" : {
		    			"id": 1,
		    			"username": "Smith",
		    			"email": "",
		    			"user_status": "ACTIVE"
		    		},
		    		"content": "I want to do something after i submit the node. How can i do that? i use hook_form_form_id_alter(),but i dont know how to use."
		    	},
		    	{
		    		"id": 4,
		    		"user" : {
		    			"id": 2,
		    			"username": "Paul",
		    			"email": "",
		    			"user_status": "ACTIVE"
		    		},
		    		"content": "I want to do something after i submit the node. How can i do that? i use hook_form_form_id_alter(),but i dont know how to use."
		    	}
		    ],
		    "description": "this is good item",
		    "price": 100,
		    "amount": 10,
		    "rating": 3
		},
		{
		    "id": 3,
		    "item_name": "Sunglass",
		    "category": {
		        "id": 1,
		        "name": "category_4",
		        "children": [
		            {
		                "id": 8,
		                "name": "category_1_1",
		                "children": [],
		                "parent": 1
		            }
		        ],
		        "parent": null
		    },
		    "store": {
		        "id": 3,
		        "store_name": "store3",
		        "category": {
		            "id": 1,
		            "name": "category_4",
		            "children": [
		                {
		                    "id": 8,
		                    "name": "category_1_1",
		                    "children": [],
		                    "parent": 1
		                }
		            ],
		            "parent": null
		        },
		        "owner": {
		            "id": 1,
		            "username": "seller",
		            "email": "",
		            "seller_status": "NONE",
		            "user_status": "ACTIVE"
		        },
		        "description": "This is store description",
		        "reviews": 0,
		        "score": 0
		    },
		    "reviews": [],
		    "description": "this is good item",
		    "price": 100,
		    "amount": 10,
		    "rating": 5
		},
		{
		    "id": 4,
		    "item_name": "Iphone9",
		    "category": {
		        "id": 1,
		        "name": "category_4",
		        "children": [
		            {
		                "id": 8,
		                "name": "category_1_1",
		                "children": [],
		                "parent": 1
		            }
		        ],
		        "parent": null
		    },
		    "store": {
		        "id": 1,
		        "store_name": "store1",
		        "category": {
		            "id": 1,
		            "name": "category_4",
		            "children": [
		                {
		                    "id": 8,
		                    "name": "category_1_1",
		                    "children": [],
		                    "parent": 1
		                }
		            ],
		            "parent": null
		        },
		        "owner": {
		            "id": 1,
		            "username": "seller",
		            "email": "",
		            "seller_status": "NONE",
		            "user_status": "ACTIVE"
		        },
		        "description": "This is store description",
		        "reviews": 0,
		        "score": 0
		    },
		    "reviews": [],
		    "description": "this is good item",
		    "price": 10,
		    "amount": 20,
		    "rating": 1
		},
		{
		    "id": 5,
		    "item_name": "Pantiee",
		    "category": {
		        "id": 1,
		        "name": "category_4",
		        "children": [
		            {
		                "id": 8,
		                "name": "category_1_1",
		                "children": [],
		                "parent": 1
		            }
		        ],
		        "parent": null
		    },
		    "store": {
		        "id": 1,
		        "store_name": "store1",
		        "category": {
		            "id": 1,
		            "name": "category_4",
		            "children": [
		                {
		                    "id": 8,
		                    "name": "category_1_1",
		                    "children": [],
		                    "parent": 1
		                }
		            ],
		            "parent": null
		        },
		        "owner": {
		            "id": 1,
		            "username": "seller",
		            "email": "",
		            "seller_status": "NONE",
		            "user_status": "ACTIVE"
		        },
		        "description": "This is store description",
		        "reviews": 0,
		        "score": 0
		    },
		    "reviews": [],
		    "description": "this is good item",
		    "price": 180,
		    "amount": 9,
		    "rating": 1
		}
	],
	mockNotifications: filterNotifications(),
	mockOrders: [
			{
	        "id": 39,
	        "item": {
	            "id": 1,
	            "item_name": "Trousers",
	            "category": {
	                "id": 1,
	                "name": "category_4",
	                "children": [
	                    {
	                        "id": 8,
	                        "name": "category_1_1",
	                        "children": [],
	                        "parent": 1
	                    }
	                ],
	                "parent": null
	            },
	            "store": {
	                "id": 1,
	                "store_name": "store1",
	                "category": {
	                    "id": 1,
	                    "name": "category_4",
	                    "children": [
	                        {
	                            "id": 8,
	                            "name": "category_1_1",
	                            "children": [],
	                            "parent": 1
	                        }
	                    ],
	                    "parent": null
	                },
	                "owner": {
	                    "id": 1,
	                    "username": "seller",
	                    "email": "",
	                    "seller_status": "NONE",
	                    "user_status": "ACTIVE"
	                },
	                "description": "This is store description",
	                "reviews": 0,
	                "score": 0
	            },
	            "description": "this is good item",
	            "price": 100,
	            "amount": 10
	        },
	        "status": "ORDERED",
	        "date_added": "2018-12-15T13:43:42.004890Z",
	        "date_ordered": "2018-12-15T21:43:42.004890Z",
	        "amount": 2
	    }
	],
	mockUsers: [
		{
			id:1,
			name: "Tahsin Yurtseven",
			email: "",
			seller_status: "NONE",
			user_status: "ACTIVE",
			created_at: '2018/12/24'
		},
		{
			id:2,
			name: "Daniel Keith",
			email: "",
			seller_status: "NONE",
			user_status: "ACTIVE",
			created_at: '2018/12/24'
		},
		{
			id:3,
			name: "Ron Bruck",
			email: "",
			seller_status: "APPROVED",
			user_status: "ACTIVE",
			created_at: '2018/12/24'
		},
		{
			id:4,
			name: "Henry Anderson",
			email: "",
			seller_status: "PENDING",
			user_status: "ACTIVE",
			created_at: '2018/12/24'
		}
	],
	mockTransactions: [
		{
			id: 1,
			user: {
				id: 1,
				name: 'Daniel Keith'
			},
			total: 200,
			item_name: 'T-shirts',
			item_price: 20,
			item_amount: 10
		},
		{
			id: 2,
			user: {
				id: 2,
				name: 'Henry Anderson'
			},
			total: 200,
			item_name: 'Basketball',
			item_price: 20,
			item_amount: 10
		},
		{
			id: 3,
			user: {
				id: 1,
				name: 'Tahsin Yurtseven'
			},
			total: 200,
			item_name: 'Sunglass',
			item_price: 20,
			item_amount: 10
		},
		{
			id: 4,
			user: {
				id: 1,
				name: 'Ron Bruck'
			},
			total: 200,
			item_name: 'Iphone9',
			item_price: 20,
			item_amount: 10
		},
		{
			id: 5,
			user: {
				id: 2,
				name: 'Tahsin Yurtseven'
			},
			total: 200,
			item_name: 'Samsung gallexy8',
			item_price: 20,
			item_amount: 10
		}
	],
	mockCategories:[
		{
	        "id": 2,
	        "name": "Premium shops",
	        "children": [
	            {
	                "id": 4,
	                "name": "category_1_1",
	                "children": [
	                    {
	                        "id": 12,
	                        "name": "category_2_3_3",
	                        "children": [
	                            {
	                                "id": 14,
	                                "name": "Iam chiild of 12",
	                                "children": [],
	                                "parent": 12
	                            }
	                        ],
	                        "parent": 4
	                    },
	                    {
	                        "id": 13,
	                        "name": "category_2_3_4",
	                        "children": [],
	                        "parent": 4
	                    }
	                ],
	                "parent": 2
	            },
	            {
	                "id": 5,
	                "name": "category_2_1",
	                "children": [],
	                "parent": 2
	            },
	            {
	                "id": 6,
	                "name": "category_3_1",
	                "children": [],
	                "parent": 2
	            }
	        ],
	        "parent": null
	    },
	    {
	        "id": 3,
	        "name": "New shops",
	        "children": [
	            {
	                "id": 9,
	                "name": "category_2_3_1",
	                "children": [],
	                "parent": 3
	            },
	            {
	                "id": 10,
	                "name": "category_2_3_2",
	                "children": [],
	                "parent": 3
	            },
	            {
	                "id": 11,
	                "name": "category_2_3_3",
	                "children": [],
	                "parent": 3
	            }
	        ],
	        "parent": null
	    },
	    {
	        "id": 1,
	        "name": "Highested rate",
	        "children": [
	            {
	                "id": 8,
	                "name": "category_1_1",
	                "children": [],
	                "parent": 1
	            }
	        ],
	        "parent": null
	    },
	    {
	        "id": 4,
	        "name": "Our picks",
	        "children": [
	            {
	                "id": 8,
	                "name": "category_1_1",
	                "children": [],
	                "parent": 1
	            }
	        ],
	        "parent": null
	    }
	],
	mockStores: [
		{
	        "id": 2,
	        "store_name": "Veranda PS",
	        "category": {
	            "id": 1,
	            "name": "category_4",
	            "children": [
	                {
	                    "id": 8,
	                    "name": "category_1_1",
	                    "children": [],
	                    "parent": 1
	                }
	            ],
	            "parent": null
	        },
	        "owner": {
	            "id": 1,
	            "username": "seller1",
	            "email": "",
	            "seller_status": "NONE",
	            "user_status": "ACTIVE"
	        },
	        "description": "This is store description",
	        "reviews": 0,
	        "score": 4.7,
	        "following": 0,
	        "like": 3,
	        "t_visit": 400,
	        "all_visit": 2000
	    },
	    {
	        "id": 3,
	        "store_name": "NYC Spongh",
	        "category": {
	            "id": 1,
	            "name": "category_4",
	            "children": [
	                {
	                    "id": 8,
	                    "name": "category_1_1",
	                    "children": [],
	                    "parent": 1
	                }
	            ],
	            "parent": null
	        },
	        "owner": {
	            "id": 1,
	            "username": "seller2",
	            "email": "",
	            "seller_status": "NONE",
	            "user_status": "ACTIVE"
	        },
	        "description": "This is store description",
	        "reviews": 0,
	        "score": 0,
	        "following": 21,
	        "like": 100,
	        "t_visit": 30,
	        "all_visit": 3012
	    },
	    {
	        "id": 1,
	        "store_name": "BYD Nokioy",
	        "category": {
	            "id": 1,
	            "name": "category_4",
	            "children": [
	                {
	                    "id": 8,
	                    "name": "category_1_1",
	                    "children": [],
	                    "parent": 1
	                }
	            ],
	            "parent": null
	        },
	        "owner": {
	            "id": 1,
	            "username": "seller2",
	            "email": "",
	            "seller_status": "NONE",
	            "user_status": "ACTIVE"
	        },
	        "description": "This is store description",
	        "reviews": 0,
	        "score": 3.8,
	        "following": 13,
	        "like": 56,
	        "t_visit": 1,
	        "all_visit": 150
	    },
	    {
	        "id": 4,
	        "store_name": "Beladon Maratin",
	        "category": {
	            "id": 1,
	            "name": "category_4",
	            "children": [
	                {
	                    "id": 8,
	                    "name": "category_1_1",
	                    "children": [],
	                    "parent": 1
	                }
	            ],
	            "parent": null
	        },
	        "owner": {
	            "id": 1,
	            "username": "seller3",
	            "email": "",
	            "seller_status": "NONE",
	            "user_status": "ACTIVE"
	        },
	        "description": "This is store description",
	        "reviews": 0,
	        "score": 4.8,
	        "following": 4,
	        "like": 6,
	        "t_visit": 54,
	        "all_visit": 2867
	    }
	]
}