"""
NVAMOTORS Notification Service
Handles email and SMS notifications for customer inquiries
"""

import os
from typing import Dict, Any, Optional
from datetime import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest import Client
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NotificationService:
    def __init__(self):
        # Email configuration
        self.sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
        self.sender_email = os.getenv('SENDER_EMAIL', 'nvamotors82@gmail.com')
        
        # SMS configuration  
        self.twilio_account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.twilio_auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        self.twilio_phone = os.getenv('TWILIO_PHONE_NUMBER')
        self.notification_phone = os.getenv('NOTIFICATION_PHONE', '+17025019216')  # Your phone number
        
        # Initialize clients
        self.sendgrid_client = None
        self.twilio_client = None
        
        if self.sendgrid_api_key:
            self.sendgrid_client = SendGridAPIClient(self.sendgrid_api_key)
        
        if self.twilio_account_sid and self.twilio_auth_token:
            self.twilio_client = Client(self.twilio_account_sid, self.twilio_auth_token)

    async def send_contact_form_notification(self, contact_data: Dict[str, Any]) -> bool:
        """Send notifications when someone submits the contact form"""
        try:
            # Prepare notification content
            customer_name = contact_data.get('name', 'Unknown')
            customer_email = contact_data.get('email', 'Not provided')
            customer_phone = contact_data.get('phone', 'Not provided')
            subject_type = contact_data.get('subject', 'General Inquiry')
            message = contact_data.get('message', 'No message provided')
            
            # Email notification
            email_sent = await self._send_email_notification(
                subject=f"🚗 NVAMOTORS - New Contact Form: {subject_type}",
                content=f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc2626;">🚗 New Contact Form Submission</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1f2937; margin-bottom: 15px;">Customer Information:</h3>
                        <p><strong>Name:</strong> {customer_name}</p>
                        <p><strong>Email:</strong> {customer_email}</p>
                        <p><strong>Phone:</strong> {customer_phone}</p>
                        <p><strong>Subject:</strong> {subject_type}</p>
                    </div>
                    <div style="background-color: #fff; padding: 20px; border-left: 4px solid #dc2626;">
                        <h4 style="color: #1f2937;">Message:</h4>
                        <p style="line-height: 1.6;">{message}</p>
                    </div>
                    <p style="color: #6b7280; margin-top: 20px;">
                        <em>Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</em>
                    </p>
                </div>
                """
            )
            
            # SMS notification
            sms_content = f"🚗 NVAMOTORS Alert!\n\nNew Contact Form:\n👤 {customer_name}\n📧 {customer_email}\n📞 {customer_phone}\n📝 {subject_type}\n\nMessage: {message[:100]}{'...' if len(message) > 100 else ''}"
            
            sms_sent = await self._send_sms_notification(sms_content)
            
            logger.info(f"Contact form notification sent - Email: {email_sent}, SMS: {sms_sent}")
            return email_sent or sms_sent
            
        except Exception as e:
            logger.error(f"Error sending contact form notification: {str(e)}")
            return False

    async def send_test_drive_notification(self, test_drive_data: Dict[str, Any]) -> bool:
        """Send notifications when someone schedules a test drive"""
        try:
            customer_name = test_drive_data.get('customerName', 'Unknown')
            customer_email = test_drive_data.get('customerEmail', 'Not provided')
            customer_phone = test_drive_data.get('customerPhone', 'Not provided')
            vehicle = test_drive_data.get('selectedVehicle', 'Vehicle not specified')
            preferred_date = test_drive_data.get('preferredDate', 'Not specified')
            preferred_time = test_drive_data.get('preferredTime', 'Not specified')
            
            # Email notification
            email_sent = await self._send_email_notification(
                subject=f"🏎️ NVAMOTORS - Test Drive Request: {vehicle}",  
                content=f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc2626;">🏎️ New Test Drive Request</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1f2937; margin-bottom: 15px;">Customer Information:</h3>
                        <p><strong>Name:</strong> {customer_name}</p>
                        <p><strong>Email:</strong> {customer_email}</p>
                        <p><strong>Phone:</strong> {customer_phone}</p>
                    </div>
                    <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1e40af; margin-bottom: 15px;">Test Drive Details:</h3>
                        <p><strong>Vehicle:</strong> {vehicle}</p>
                        <p><strong>Preferred Date:</strong> {preferred_date}</p>
                        <p><strong>Preferred Time:</strong> {preferred_time}</p>
                    </div>
                    <p style="color: #6b7280; margin-top: 20px;">
                        <em>Requested: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</em>
                    </p>
                </div>
                """
            )
            
            # SMS notification
            sms_content = f"🏎️ NVAMOTORS Alert!\n\nTest Drive Request:\n👤 {customer_name}\n📞 {customer_phone}\n🚗 {vehicle}\n📅 {preferred_date} at {preferred_time}"
            
            sms_sent = await self._send_sms_notification(sms_content)
            
            logger.info(f"Test drive notification sent - Email: {email_sent}, SMS: {sms_sent}")
            return email_sent or sms_sent
            
        except Exception as e:
            logger.error(f"Error sending test drive notification: {str(e)}")
            return False

    async def send_faq_question_notification(self, faq_data: Dict[str, Any]) -> bool:
        """Send notifications when someone submits a FAQ question"""
        try:
            customer_name = faq_data.get('name', 'Anonymous')
            customer_email = faq_data.get('email', 'Not provided')
            question = faq_data.get('question', 'No question provided')
            
            # Email notification
            email_sent = await self._send_email_notification(
                subject=f"❓ NVAMOTORS - New FAQ Question from {customer_name}",
                content=f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc2626;">❓ New FAQ Question</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1f2937; margin-bottom: 15px;">Customer Information:</h3>
                        <p><strong>Name:</strong> {customer_name}</p>
                        <p><strong>Email:</strong> {customer_email}</p>
                    </div>
                    <div style="background-color: #fff; padding: 20px; border-left: 4px solid #f59e0b;">
                        <h4 style="color: #1f2937;">Question:</h4>
                        <p style="line-height: 1.6;">{question}</p>
                    </div>
                    <p style="color: #6b7280; margin-top: 20px;">
                        <em>Submitted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</em>
                    </p>
                </div>
                """
            )
            
            # SMS notification
            sms_content = f"❓ NVAMOTORS Alert!\n\nNew FAQ Question:\n👤 {customer_name}\n📧 {customer_email}\n\n❓ {question[:120]}{'...' if len(question) > 120 else ''}"
            
            sms_sent = await self._send_sms_notification(sms_content)
            
            logger.info(f"FAQ question notification sent - Email: {email_sent}, SMS: {sms_sent}")
            return email_sent or sms_sent
            
        except Exception as e:
            logger.error(f"Error sending FAQ question notification: {str(e)}")
            return False

    async def send_custom_search_notification(self, search_data: Dict[str, Any]) -> bool:
        """Send notifications when someone submits a custom vehicle search"""
        try:
            customer_name = search_data.get('name', 'Unknown')
            customer_email = search_data.get('email', 'Not provided')
            customer_phone = search_data.get('phone', 'Not provided')
            preferences = search_data.get('preferences', 'Not specified')
            description = search_data.get('description', 'No description provided')
            
            # Email notification
            email_sent = await self._send_email_notification(
                subject=f"🔍 NVAMOTORS - Custom Vehicle Search Request",
                content=f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc2626;">🔍 Custom Vehicle Search Request</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1f2937; margin-bottom: 15px;">Customer Information:</h3>
                        <p><strong>Name:</strong> {customer_name}</p>
                        <p><strong>Email:</strong> {customer_email}</p>
                        <p><strong>Phone:</strong> {customer_phone}</p>
                    </div>
                    <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #059669; margin-bottom: 15px;">Search Preferences:</h3>
                        <p>{preferences}</p>
                    </div>
                    <div style="background-color: #fff; padding: 20px; border-left: 4px solid #10b981;">
                        <h4 style="color: #1f2937;">Additional Description:</h4>
                        <p style="line-height: 1.6;">{description}</p>
                    </div>
                    <p style="color: #6b7280; margin-top: 20px;">
                        <em>Submitted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</em>
                    </p>
                </div>
                """
            )
            
            # SMS notification
            sms_content = f"🔍 NVAMOTORS Alert!\n\nCustom Vehicle Search:\n👤 {customer_name}\n📞 {customer_phone}\n🔍 {preferences[:80]}{'...' if len(preferences) > 80 else ''}"
            
            sms_sent = await self._send_sms_notification(sms_content)
            
            logger.info(f"Custom search notification sent - Email: {email_sent}, SMS: {sms_sent}")
            return email_sent or sms_sent
            
        except Exception as e:
            logger.error(f"Error sending custom search notification: {str(e)}")
            return False

    async def _send_email_notification(self, subject: str, content: str) -> bool:
        """Send email notification using SendGrid"""
        if not self.sendgrid_client:
            logger.warning("SendGrid not configured - skipping email notification")
            return False
            
        try:
            message = Mail(
                from_email=self.sender_email,
                to_emails="nvamotors82@gmail.com",  # Your business email
                subject=subject,
                html_content=content
            )
            
            response = self.sendgrid_client.send(message)
            return response.status_code == 202
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False

    async def _send_sms_notification(self, content: str) -> bool:
        """Send SMS notification using Twilio"""
        if not self.twilio_client or not self.twilio_phone:
            logger.warning("Twilio not configured - skipping SMS notification")
            return False
            
        try:
            message = self.twilio_client.messages.create(
                body=content,
                from_=self.twilio_phone,
                to=self.notification_phone
            )
            
            return message.sid is not None
            
        except Exception as e:
            logger.error(f"Failed to send SMS: {str(e)}")
            return False

# Global notification service instance
notification_service = NotificationService()