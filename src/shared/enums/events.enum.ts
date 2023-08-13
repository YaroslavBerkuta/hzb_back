export enum Events {
	StopSessions = 'StopSessions',
	OnErrorJoinUser = 'OnErrorJoinUser',
	OnUserConnect = 'OnUserConnect',
	OnUserDisconnect = 'OnUserDisconnect',
	EmployerStatusChanged = 'EmployerStatusChanged',
	CreateMainBranch = 'CreateMainBranch'
}

export interface IEventsPayloads {
	[Events.StopSessions]: {
		userId: number
		sessionsIds?: number[]
	}

	[Events.OnUserDisconnect]: {
		userId: number
	}
}
