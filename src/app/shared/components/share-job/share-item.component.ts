import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faShareSquare, faVoicemail } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-share-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './share-item.component.html',
  styleUrl: './share-item.component.scss'
})
export class ShareItemComponent  {

  faFacebook = faFacebook;
  faXTwitter = faXTwitter;
  faLinkedIn = faLinkedin;
  fawhatsapp = faWhatsapp;
  faEmail = faEnvelope;
  faShareSquare = faShareSquare;
  message!: string;

  @Input() content: { link: string; title?: string; description?: string, location?: string } = { link: '', title: '', description: '', location: '' };
  ngOnInit() {
    this.message = `Nouvelle offre d'emplois ${this.content.title} ${this.content.location} cliquez sur le lien ci-dessous pour visualiser ${this.content.link}`
  }
  shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.content.link),this.message}`;
    window.open(url, '_blank');
  }

  shareOnTwitter() {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.content.link)}&text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank');
  }

  shareOnLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.content.link),this.message}`;
    window.open(url, '_blank');
  }

  shareOnWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank');
  }

  shareViaEmail() {
    const subject = encodeURIComponent(`Nouvelle offre d'emplois: ${this.content.title || 'Content'}`);
    const body = encodeURIComponent(`${this.content.description || ''} ${this.content.link}`);
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.open(url, '_self');
  }

}
