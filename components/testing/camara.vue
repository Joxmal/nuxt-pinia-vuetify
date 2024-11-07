<template>
  <v-card>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-card width="500px">
          <v-alert dense dark color="green" v-if="scannedQrCodes">
            <strong>QR Code Scanned: {{ scannedQrCodes }}</strong>
          </v-alert>

          <div id="qr-code-full-region" class="my-3 mx-3"></div>

          <v-btn @click="startScanning">Iniciar Escaneo</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';

const scannedQrCodes = ref<string>('');
let html5QrCode: Html5Qrcode | null = null;

function onScanSuccess(decodedText: string) {
  scannedQrCodes.value = decodedText;
}

function onScanError(error:any) {
  console.log(error)
}

async function startScanning() {
  try {
    const devices = await Html5Qrcode.getCameras();
    if (devices && devices.length) {
      // Usar la cámara trasera (environment) o frontal (user)
      const cameraId = devices[0].id; // Puedes elegir qué cámara usar
      html5QrCode = new Html5Qrcode("qr-code-full-region");

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      await html5QrCode.start({ deviceId: { exact: cameraId } }, config, onScanSuccess, onScanError);
    } else {
      console.error("No cameras found.");
    }
  } catch (err) {
    console.error("Error getting cameras:", err);
  }
}

onBeforeUnmount(() => {
  if (html5QrCode) {
    html5QrCode.stop().catch(err => {
      console.error("Error stopping QR code scanner:", err);
    });
  }
});
</script>

<style scoped>
#qr-code-full-region {
  border: 1px solid #ccc;
}
</style>