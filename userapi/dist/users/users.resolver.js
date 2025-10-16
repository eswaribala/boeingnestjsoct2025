"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("./dto/user.type");
const users_service_1 = require("./users.service");
const graphql_2 = require("@nestjs/graphql");
const user_type_2 = require("./dto/user.type");
const user_type_3 = require("./dto/user.type");
let UsersResolver = class UsersResolver {
    service;
    constructor(service) {
        this.service = service;
    }
    getUsers() {
        return this.service.findAll();
    }
    getUser(id) {
        return this.service.findOne(id);
    }
    createUser(input) {
        return this.service.create(input);
    }
    updateUser(input) {
        return this.service.update(input);
    }
    removeUser(id) {
        return this.service.remove(id);
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, graphql_2.Query)(() => [user_type_1.User], { name: 'users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_2.Query)(() => user_type_1.User, { name: 'user', nullable: true }),
    __param(0, (0, graphql_2.Args)('id', { type: () => graphql_2.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_2.Mutation)(() => user_type_1.User),
    __param(0, (0, graphql_2.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_2.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_2.Mutation)(() => user_type_1.User, { nullable: true }),
    __param(0, (0, graphql_2.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_3.UpdateUserInput]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_2.Mutation)(() => Boolean),
    __param(0, (0, graphql_2.Args)('id', { type: () => graphql_2.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "removeUser", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_type_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map