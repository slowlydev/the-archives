import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import "./css/Tab2.css";

const Tab2: React.FC = () => {

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle size="large">Builds</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

            </IonContent>
        </IonPage>
    );
};

export default Tab2;
