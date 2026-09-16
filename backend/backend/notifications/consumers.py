
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json 

class NotificationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        if self.user.is_authenticated:
            self.group_name = f'user_{self.user.id}'
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()
        else:
            self.close()
            
    async def disconnect(self, code):
        if self.user.is_authenticated:
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
        
    async def send_notification(self, event):
        message = event['message']
        print(message)
        print('printed message')
        notification_type = event['type']
        await self.send(text_data=json.dumps({
            'message': message,
            'type': notification_type
        }))


        
