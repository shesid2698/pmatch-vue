export default async function GetMemberDetail(memberId, token) {
    const { $axios } = useNuxtApp();
    let user = null;
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetMemberDetail',
            {
                PmatchMemberId: memberId,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        if (response.data.Status.Code === 0) {
            user = response.data.Data[0];
        }
    } catch (error) {
        console.log(`GetMemberDetail error:${error}`);
    } finally {
        return user;
    }
}
