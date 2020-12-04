<template>
    <div>
        <Header>
        </Header>
        <el-container>
            <Aside>
            </Aside>
            <el-main>
                这里是我的收藏
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import Header from "@/components/header.vue";
    import Aside from "@/components/UserAside.vue";
    export default {
        name: "MyStar",
        components: {
            Header,
            Aside,
        },
        mounted() {

        },
        data() {
            return {
                perInfo: {

                }
            };
        },
        methods: {
      
        }
    }
</script>