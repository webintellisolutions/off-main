const rules = {
	user: {
		static: [
			"user-modal:editPassword",
		],
	},

	superv: {
		static: [
			"drawer-superv-items:view",
			"tickets-manager:showall",
			"user-modal:editProfile",
			"user-modal:editQueues",
			"user-modal:editPassword",
			"user-table:editSpy",
			"user-table:editTricked",
			"ticket-options:deleteTicket",
			"contacts-page:deleteContact",
			"dashboard:view",
		],
	},

	admin: {
		static: [
			"dashboard:view",
			"drawer-admin-items:view",
			"tickets-manager:showall",
			"user-modal:editProfile",
			"user-modal:editPassword",
			"user-modal:editQueues",
			"user-table:editSpy",
			"user-table:editTricked",
			"ticket-options:deleteTicket",
			"contacts-page:deleteContact",
			"connections-page:actionButtons",
			"connections-page:addConnection",
			"connections-page:editOrDeleteConnection",
			"connections-page:restartConnection"
		],
	},
};

export default rules;