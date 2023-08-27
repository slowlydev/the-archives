import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import "./css/Tab4.css";

const Tab4: React.FC = () => {
    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle size="large">Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <img src="/assets/maps/map_day.jpg" alt="" />
                <img src="/assets/maps/map_night.jpg" alt="" />
            </IonContent>
        </IonPage>
    );
};

export default Tab4;
