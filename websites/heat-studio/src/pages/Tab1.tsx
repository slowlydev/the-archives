import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import React from 'react';
import './css/Tab1.css';
import moment from 'moment';
import cards from'./data/home-card.json';

let now = moment().format("dddd, D. MMMM");
  
const Tab1: React.FC = () => {
  return (
    <IonPage>
        <IonHeader translucent>
            <IonToolbar>
                <IonTitle size="large">Today</IonTitle>
            </IonToolbar>
            <IonToolbar>
                <IonTitle size="small" className="date-ios">{now}</IonTitle>
            </IonToolbar>
      </IonHeader>
      <IonContent>
            <IonList>
                {cards.map(card => (
                    <IonCard className="ios-card">
                        <IonCardHeader>
                            <IonCardSubtitle>{card.subtitle}</IonCardSubtitle>
                            <IonCardTitle>{card.title}</IonCardTitle>
                        </IonCardHeader>
                        <img src={card.img} alt=""/>
                        <IonCardContent>
                            <p>{card.text}</p>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
