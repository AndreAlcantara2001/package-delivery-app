<template>
    <div>
        <div v-if="nearRiders">
            Near riders will appear here
        </div>
        <div v-else>
            There are no near riders
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            preDeliId: this.$route.params.id,
            nearRiders: null
        }
    },
    mounted() {
        this.getNearRiders();
    },
    methods: {

        getNearRiders() {
            const url = 'http://localhost:7071/delivery/getNearRiders/'+ this.preDeliId;

            axios.get(url)
                .then(response => {
                    const respData = response.data;
                    console.log(respData);
                })
                .catch(error => console.error(error))
        }
    }
}
</script>

<style></style>
