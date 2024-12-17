<template>
  <div class="beefree">
    <div id="bee-plugin-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject, ref } from "vue";
// import { useStore } from "vuex";

// import { defaultTemplate } from "./defaultTemplate";

// import Template from "@/common/services/template";
// import Recovery from "@/common/services/recovery";

export default defineComponent({
  name: "BeeFree",
  setup() {
    const template: any = {};
    // const store = useStore();
    const templateData = ref({ metadata: "", html: "" });
    const loading = ref<boolean>(false);
    const showProductDialog = ref<boolean>(false);
    const beeFreePlugin: any = inject("$beeFree");
    const beeConfig = {
      uid: "12345",
      container: "bee-plugin-container",
      language: "pt-BR",
      shared: true,
      trackChanges: true,
      username: 'smb',
      userColor: "black",
      rowsConfiguration: {
        emptyRows: true,
        defaultRows: true,
      },
      contentDialog: {
        externalContentURLs: {
          label: "Buscar Produto",
          handler: function (resolve: any, reject: any) {
            showProductDialog.value = true;

            // O modal deve ser aberto como uma Promise.
            // Nesse caso, ao invés de ser aberto como Promise,
            // o 'resolve' e 'reject' foram passados como props.

            // O botão "fechar" e "cancelar" deve dar um reject()
            // Já o botão "confirmar" deve dar resolve com um objeto no formato abaixo

            // A resolução deve ser as linhas nesse formato abaixo:
            // E o value deve conter um retorno igual ao que há no mock
            // http://editor.local.com.br:8082/mock/row.json

            // resolve({
            //   name: "212-Bermuda-Bermuda-Blusa (#432-2172-1-2171-9-1132)",
            //   value:
            //     "https://templatize-v2.allin.com.br/api/56097e545af7ed5c8cd6494c2caf2c29/products/432-2172-1-2171-9-1132",
            // });

            sucessPromise.value = resolve;

            rejectPromise.value = reject;
          },
        },
      },
      /*customHeaders: [
        {
          name: "Authorization",
          value: `Bearer ${store.getters["token/token"]}`,
        },
        {
          name: "Account-id",
          value: store.getters["token/data"].dxpId,
        },
      ],*/
      mergeTags: [
        {
          name: "Nome",
          value: "##nome##",
        },
        {
          name: "Email",
          value: "##email##",
        },
        {
          name: "Telefone",
          value: "##telefone##",
        },
      ],
      onSave: async (jsonFile: any, htmlFile: any) => {
        loading.value = true;
        await saveTemplate(jsonFile, htmlFile);
      },
      onError: (errorMessage: any) => {
        console.log("onError ", errorMessage);
      },
      onAutoSave: async (jsonFile: any, htmlFile: any) => {
        // await saveTemplate(jsonFile, htmlFile);
      },
      onSessionChange: function (data: any) {
        console.log("*** [integration] --> (onSessionChange) ", data);
      },
    };
    const sucessPromise: any = ref(null);
    const rejectPromise: any = ref(null);

    // METHODS
    const getTemplate = async () => {
      loading.value = true;
      /*await Recovery.getAllinId().then(async (allinId) => {
        loading.value = false;

        try {
          const response = await Template.getTemplate(
            store.getters["token/data"].templateId
          );
          templateData.value = response;

          template.value = JSON.parse(templateData.value.metadata);

          beeConfig.uid = allinId;

          await beeFreePlugin
            .getToken(
              import.meta.env.VITE_APP_BEE_FREE_CLIENT_ID,
              import.meta.env.VITE_APP_BEE_FREE_CLIENT_SECRET
            )
            .then(() => {
              beeFreePlugin.start(beeConfig, template.value || {});
            });
        } catch (error) {
          console.log("ERROR HERE", error);
        }
      });*/
      await beeFreePlugin
        .getToken(
          import.meta.env.VITE_APP_BEE_FREE_CLIENT_ID,
          import.meta.env.VITE_APP_BEE_FREE_CLIENT_SECRET
        )
        .then(() => {
          beeFreePlugin.start(beeConfig, template.value || {});
        }).finally(() => {
          loading.value = false;
        });
    };

    const saveTemplate = async (jsonFile: string, htmlFile: string) => {
      templateData.value.metadata = jsonFile;
      templateData.value.html = htmlFile;

      console.log("templateData", templateData.value);

      /*await Template.saveTemplate(
        store.getters["token/data"].templateId,
        templateData.value
      )
        .then(() => {
          loading.value = false;
        })
        .catch((error) => {
          console.log("ERROR", error);
        });*/
    };

    const closeProductDialog = () => {
      showProductDialog.value = false;
    };

    onMounted(async () => {
      await getTemplate();
    });

    return {
      loading,
      showProductDialog,
      closeProductDialog,
      sucessPromise,
      rejectPromise,
    };
  },
});
</script>

<style lang="scss">
.beefree {
  &__loading {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
    height: 100vh;

    opacity: 0.4;
    background-color: black;
  }

  &__loading-img {
    position: relative;
    top: 300px;
  }
}

#bee-plugin-container {
  display: block;
  margin: 0;
  padding: 0;
  width: 100vw;
  overflow: hidden;
  height: 100vh;
}
</style>
