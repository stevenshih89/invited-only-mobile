export const UserMutationsKeys = {
	changeUserEmail: (userId: string) => ["change-user-email", userId],
	changeUserLocation: (userId: string) => ["change-user-location", userId],
	deleteUserAccount: (userId: string) => ["delete-user-account", userId],
	updateUserGender: (userId: string) => ["update-user-gender", userId],
	updateUserShowGenderInProfile: (userId: string) => ["update-user-show-gender-in-profile", userId],
	updateUserNotificationsSettings: (userId: string) => ["update-user-notification-settings", userId],
	updateUserEventList: (userId: string) => ["update-user-event-list", userId],
	sendVerificationCode: () => ["send-verification-code"],
	updateUserPassedDemo: (userId: string) => ["update-user-passed-demo", userId],
}
