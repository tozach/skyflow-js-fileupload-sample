try {
    //initialize Skyflow client
    const skyflow = Skyflow.init({
        vaultID: "s6454c251b66407a81cf519a12850e72",
        vaultURL: "https://ebfc9bee4242.vault.skyflowapis.com",
        getBearerToken: () => {
            return new Promise((resolve, reject) => {
                
                resolve("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJwZWU5YzIyZDBkYzc0NDIyYWI2ZGMwZmI1ODU0MTg2NiIsImF1ZCI6Imh0dHBzOi8vbWFuYWdlLnNreWZsb3dhcGlzLmNvbSIsImV4cCI6MTY3NDI0OTA4NywiaWF0IjoxNjcxNjU3MDg3LCJpc3MiOiJzYS1hdXRoQG1hbmFnZS5za3lmbG93YXBpcy5jb20iLCJqdGkiOiJiN2RlOTc3NGJiYjE0YjAxOTNiYjBkNTVmMzdjZDQ4ZiIsInN1YiI6Im9mNDg1OTE1M2ZkZDRjNjc5MzYxZTAxNTAzOTAyMzQ0In0.RsJSN59D_vGPiUdsnsSYGqE7zZgQ2aOKgwuc5I4_ITNqfx-5VdzbmtN4C1xMxmRrVqbbo9zBOezLId_d9UQap5AORkaSaL7h3h_IGSmzrr9fxbCRaBnCL8ReH9gCOlw9a6wwnABtXl4ICQKe8OmjbEDbJoffsJnKHVop4JGYWigWpJaw9pdfZs8TAIrFNW4HFuUNkiMIp8YL3d8FLjFs2eOViaz6gjaOVvwHXXrJN3LwzozGzwbuHsTID3Zic5TE4W2mMXTJ5so3EiQiDB9W6oWxPl2sRMvTtdUL2E25qc47nEh2P0rds-vIrg_K6VGEu81QIz0AZqtYChy5sTblnA");
                /*
                const Http = new XMLHttpRequest();

                Http.onreadystatechange = () => {
                    if (Http.readyState === 4 && Http.status === 200) {
                        const response = JSON.parse(Http.responseText);
                        resolve(response.accessToken);
                    }
                };
                const url = "<TOKEN_END_POINT_URL>";
                Http.open("GET", url);
                Http.send();
                */
            });
        },
        options: {
            logLevel: Skyflow.LogLevel.ERROR,
            env: Skyflow.Env.PROD,
        }
    });
    
    // create collect Container
    const collectContainer = skyflow.container(Skyflow.ContainerType.COLLECT);

    //custom styles for collect elements
    const collectStylesOptions = {
        inputStyles: {
            base: {
                border: "1px solid #eae8ee",
                padding: "10px 16px",
                borderRadius: "4px",
                color: "#1d1d1d",
                marginTop: "4px",
            },
            complete: {
                color: "#4caf50",
            },
            empty: {},
            focus: {},
            invalid: {
                color: "#f44336",
            },
        },
        labelStyles: {
            base: {
                fontSize: "16px",
                fontWeight: "bold",
            },
        },
        errorTextStyles: {
            base: {
                color: "#f44336",
            },
        },
    };

    // create card number collect element
    const cardNumberElement = collectContainer.create({
        table: "credit_cards",
        column: "card_number",
        ...collectStylesOptions,
        placeholder: "card number",
        label: "Card Number",
        type: Skyflow.ElementType.CARD_NUMBER,

    }, {
        enableCopy: true
    });
    // create file collect element
    const fileElement = collectContainer.create({
        table: "pii_fields",
        column: "file",
        ...collectStylesOptions,
        type: Skyflow.ElementType.FILE_INPUT,
        skyflowID: 'ae30cfd7-05f1-4f52-a3eb-f9c640022677'
    });

    // mount the elements
    cardNumberElement.mount("#collectCardNumber");
    fileElement.mount("#collectFile");


    // collect all elements data
    const collectButton = document.getElementById("collectPCIData");
    if (collectButton) {
        collectButton.addEventListener("click", () => {
            const collectResponse = collectContainer.collect();

            collectResponse
                .then((response) => {
                    document.getElementById("collectResponse").innerHTML =
                        JSON.stringify(response, null, 2);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    const uploadButton = document.getElementById("uploadFileData");
    if (uploadButton) {
        uploadButton.addEventListener("click", () => {
            const uploadResponse = collectContainer.uploadFiles().then((res) => {
                document.getElementById("uploadResponse").innerHTML =
                    JSON.stringify(res, null, 2);
            }).catch((err) => {
                console.log(err);
            })
        })
    }
} catch (err) {
    console.log(err);
}