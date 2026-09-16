from allauth.headless.base.response import APIResponse

class TOTPNotFoundResponse(APIResponse):
    def __init__(self, request, secret, totp_data_uri):
        super().__init__(
            request,
            meta={
                "secret": secret,
                "totp_data_uri": totp_data_uri,
            },
            status=404,
        )