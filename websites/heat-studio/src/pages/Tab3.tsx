import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonThumbnail, IonLabel, IonItem, IonModal, IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import React, { useState } from "react";
import "./css/Tab3.css";
import cars from "./data/cars.json";
import ks_cars from "./data/ks-cars.json";
import le_cars from "./data/le-cars.json";
import se_cars from "./data/se-cars.json";

//Need to add link to all Albums

const Tab3: React.FC = () => {
    const [show_le, setShow_le] = useState(false);
    const [show_ks, setShow_ks] = useState(false);
    const [show_se, setShow_se] = useState(false);
    const [show_all, setShow_all] = useState(false);

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle size="large">Car Lists</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonCard className="ios-card" button={true} onClick={() => setShow_se(true)}>
                        <IonCardHeader>
                            <IonCardSubtitle>Special Car List</IonCardSubtitle>
                            <IonCardTitle>Special Editions</IonCardTitle>
                        </IonCardHeader>
                        <img src="https://img5.goodfon.com/wallpaper/nbig/5/31/need-for-speed-heat-nfs-electronic-arts-need-for-speed-by-mi.jpg" alt="" />
                    </IonCard>

                    <IonCard className="ios-card" button={true} onClick={() => setShow_all(true)}>
                        <IonCardHeader>
                            <IonCardSubtitle>Car List</IonCardSubtitle>
                            <IonCardTitle>All Cars</IonCardTitle>
                        </IonCardHeader>
                        <img src="https://img5.goodfon.com/wallpaper/nbig/6/d8/mikhail-sharov-by-mikhail-sharov-dark-knight-nissan-gt-r-r35.jpg" alt="" />
                    </IonCard>

                    <IonCard className="ios-card" button={true} onClick={() => setShow_le(true)}>
                        <IonCardHeader>
                            <IonCardSubtitle>Special Car List</IonCardSubtitle>
                            <IonCardTitle>Legends Editions</IonCardTitle>
                        </IonCardHeader>
                        <img src="https://img5.goodfon.com/wallpaper/nbig/4/3a/need-for-speed-heat-electronic-arts-2019-nfs-need-for-speed.jpg" alt="" />
                    </IonCard>
                    
                    <IonCard className="ios-card" button={true} onClick={() => setShow_ks(true)}>
                        <IonCardHeader>
                            <IonCardSubtitle>Special Car List</IonCardSubtitle>
                            <IonCardTitle>K.S. Editions</IonCardTitle>
                        </IonCardHeader>
                        <img src="https://img5.goodfon.com/wallpaper/nbig/2/73/mikhail-sharov-by-mikhail-sharov-need-for-speed-heat-nfs-hea.jpg" alt="" />
                    </IonCard>
                </IonList>

                <IonModal isOpen={show_se}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => setShow_se(false)}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>Special Editions</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            {se_cars.map(se_car => (
                                <IonItem>
                                    <IonThumbnail className="car-img" slot="start"><img src={se_car.img} alt="" /></IonThumbnail>
                                    <IonLabel>
                                        <h2>{se_car.name}</h2>
                                        <h4>{se_car.money}</h4>
                                        <h5>Class: {se_car.class} Tuning: {se_car.tuning}</h5>
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                    </IonContent>
                </IonModal>

                <IonModal isOpen={show_le}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => setShow_le(false)}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>Legends Edition</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            {le_cars.map(le_car => (
                                <IonItem>
                                    <IonThumbnail className="car-img" slot="start"><img src={le_car.img} alt="" /></IonThumbnail>
                                    <IonLabel>
                                        <h2>{le_car.name}</h2>
                                        <h4>{le_car.money}</h4>
                                        <h5>Class: {le_car.class} Tuning: {le_car.tuning}</h5>
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                    </IonContent>
                </IonModal>

                <IonModal isOpen={show_ks}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => setShow_ks(false)} >Close</IonButton>
                            </IonButtons>
                            <IonTitle>K.S. Edition</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            {ks_cars.map(ks_car => (
                                <IonItem>
                                    <IonThumbnail className="car-img" slot="start"><img src={ks_car.img} alt="" /></IonThumbnail>
                                    <IonLabel>
                                        <h2>{ks_car.name}</h2>
                                        <h4>{ks_car.money}</h4>
                                        <h5>Class: {ks_car.class} Tuning: {ks_car.tuning}</h5>
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                    </IonContent>
                </IonModal>

                <IonModal isOpen={show_all}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => setShow_all(false)} >Close</IonButton>
                            </IonButtons>
                            <IonTitle>All Cars</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            {cars.map(car => (
                                <IonItem>
                                    <IonThumbnail className="car-img" slot="start"><img src={car.img} alt="" /></IonThumbnail>
                                    <IonLabel>
                                        <h2>{car.name}</h2>
                                        <h4>{car.money} $</h4>
                                        <h5>Class: {car.class} Tuning: {car.tuning}/10</h5>
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Tab3;
