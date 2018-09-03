import React, { Component } from "react";
import { I18n, Trans } from "react-i18next";

const FarmsBuild = response => (
    <div className="col-md-6 col-lg-6" data-aos="flip-right">
        <div
            className="widget-small primary coloured-icon"
            style={{ alignItems: "center" }}
        >
            <a href="">
                <i
                    className="icon fa  fa-eye fa-3x"
                    style={{ backgroundColor: response.colorRand }}
                />
            </a>
            <div className="row container" style={{ wordBreak: "break-word" }}>
                <div
                    className="info col-sm-9 col-md-9"
                    data-aos="fade-up"
                    data-aos-duration="500"
                >
                    <h4>
                        <a href={"./farm/" + response.obj[0]}>
                            {response.obj[1]}
                        </a>
                    </h4>
                    <I18n ns="farm">
                        {(t, { i18n }) => (
                            <p>
                                <b>{t("seeFarm")}.</b>
                            </p>
                        )}
                    </I18n>
                </div>
                <div className="col-sm-3 col-md-3">
                    <a
                        href="#"
                        onClick={() => response.modalData(response.obj[0])}
                        data-toggle="modal"
                        data-target="#modalConfigFinca"
                        style={{
                            display: "grid",
                            alignContent: "center",
                            justifyContent: "flex-end"
                        }}
                    >
                        <i className="fa fa-cogs fa-2x" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default FarmsBuild;
