<template>
<div>
    <el-table :data="noticeData" stripe style="width: 100%;">
        <el-table-column label="标题" align="left">
            <template slot-scope="scope">
                <span v-if="scope.row.isTop" class="badge" :class="scope.row.topBadge.type">{{scope.row.topBadge.label}}</span>
                <span>{{ scope.row.title }}</span>
            </template>
        </el-table-column>
        <el-table-column label="类别" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.newsCategory.newsCategoryName }}</span>
            </template>
        </el-table-column>

        <el-table-column label="标签" width="300" align="center">
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" style="margin:0 3px;" v-for="tag in scope.row.newsLabel" :key="tag.id" :type="tag.type">{{ tag.name }}</el-tag>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="发布日期" align="center">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.deplDate}}</span>
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
            <i class="el-icon-edit" style="font-size:20px;"  @click="reEditNotice(scope.$index, scope.row)"></i>
               
                <span style="color:#999999;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <i class="el-icon-delete" style="font-size:20px;color:#F56C6C;" @click="deleteNotice(scope.$index, scope.row)"></i>
                
            </template>
        </el-table-column>
    </el-table>
    <paging style="float:right;" ref="paging" :paging="paging"></paging>
</div>
</template>

<script>
import paging from '@/components/backstage/notice/paging.vue'
export default {
    data() {
        return {
            noticeData: [],
            loading: true,
            newsFlag: 0,
            paging: {
                pageSize: 10,
                pageNo: 1,
                totalPage: 0,
                totalCount: 0
            },
            search: ''
        }
    },
    created() {
        this.setNotice()
    },
    methods: {
        setNotice() {
            let _this = this
            // this.pno = pno
            this.$axios('news/', { //得到所有newsFlag通知数据
                method: 'get',
                credentials: 'include',
                params: {
                    'newsFlag': _this.newsFlag,
                    'pageNo': _this.paging.pageNo,
                    'title': ''
                },
            }).then(res => {
                _this.noticeData = res.data.records
                _this.noticeData.forEach(function (item) {
                    if (item.top != 0) {
                        item.isTop = true;
                        if (item.top === 2) {
                            item.topBadge = {
                                type: 'badge-danger',
                                label: '高级置顶'
                            }

                        } else {
                            item.topBadge = {
                                type: 'badge-primary',
                                label: '置顶'
                            }
                        }

                    } else item.isTop = false;
                    let l = item.newsLabel.split(',')
                    for (let i = 0; i < l.length; i++) {
                        let m = l[i]
                        let p = {
                            id: i,
                            name: m,
                            type: ''
                        }
                        l[i] = p
                    }
                    item.newsLabel = l
                })
                console.log(_this.noticeData)
                this.paging = {
                    pageSize: res.data.pageSize,
                    pageNo: res.data.pageNo,
                    totalPage: res.data.totalPage,
                    totalCount: res.data.totalCount
                }
                _this.loading = false //加载动画
            })

        },
        reEditNotice(index, row) {
            console.log(index, row);
            this.$router.push({
                path: '/Backstage/Notice/EditNotice',
                query: {
                    id: row.id
                }
            });
        },
        deleteNotice(index, row) {
            console.log(index, row);
            let ids = [];
            let _this = this
            ids.push(row.id)
            console.log(ids)
            this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios('news/', {
                    method: 'delete',
                    credentials: 'include',
                    data: ids
                }).then(res => {
                    let type = ''
                    if (res.data.code == 200) {
                        type = 'success'
                        _this.setNotice()
                        this.$parent.setDraftBadge()
                    } else {
                        type = 'error'
                    }
                    this.$message({
                        type: type,
                        message: res.data.message
                    });

                }).catch(err => {
                    console.log(err)
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    },
    components: {
        paging
    }
}
</script>
