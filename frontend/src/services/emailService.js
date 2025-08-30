import emailjs from '@emailjs/browser';

class EmailService {
  constructor() {
    this.publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    this.serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    this.contactTemplateId = process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID;
    this.testDriveTemplateId = process.env.REACT_APP_EMAILJS_TESTDRIVE_TEMPLATE_ID;
    
    // Initialize EmailJS
    if (this.publicKey) {
      emailjs.init(this.publicKey);
    }
  }

  async sendContactEmail(formData) {
    try {
      if (!this.publicKey || !this.serviceId || !this.contactTemplateId) {
        throw new Error('EmailJS configuration is missing');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'No proporcionado',
        subject: this.getSubjectLabel(formData.subject),
        message: formData.message,
        to_email: 'nvamotors82@gmail.com'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.contactTemplateId,
        templateParams
      );

      console.log('Contact email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }
  }

  async sendTestDriveEmail(formData) {
    try {
      if (!this.publicKey || !this.serviceId || !this.testDriveTemplateId) {
        throw new Error('EmailJS configuration is missing');
      }

      // Get vehicle information
      const vehicleInfo = formData.vehicleInfo || 'Información del vehículo no disponible';

      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        vehicle_info: vehicleInfo,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        message: formData.additionalComments || 'Sin comentarios adicionales',
        to_email: 'nvamotors82@gmail.com'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.testDriveTemplateId,
        templateParams
      );

      console.log('Test drive email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending test drive email:', error);
      throw error;
    }
  }

  getSubjectLabel(subject) {
    const subjects = {
      'general': 'Consulta General',
      'vehicle': 'Información de Vehículo',
      'financing': 'Financiamiento',
      'service': 'Servicio Técnico',
      'test-drive': 'Prueba de Manejo'
    };
    return subjects[subject] || subject;
  }

  // Test EmailJS configuration
  async testConfiguration() {
    try {
      if (!this.publicKey || !this.serviceId) {
        return false;
      }
      
      // Send a simple test email
      const testParams = {
        from_name: 'Test NVAMOTORS',
        from_email: 'nvamotors82@gmail.com',
        message: 'Prueba de configuración EmailJS',
        to_email: 'nvamotors82@gmail.com'
      };

      await emailjs.send(this.serviceId, this.contactTemplateId, testParams);
      return true;
    } catch (error) {
      console.error('EmailJS configuration test failed:', error);
      return false;
    }
  }
}

export default new EmailService();