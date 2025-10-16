"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const faker_1 = require("@faker-js/faker");
let UsersService = class UsersService {
    users = [];
    create(user) {
        const newUser = {
            userId: faker_1.faker.number.int({ min: 1, max: 1000 }),
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        return this.users.find(user => user.userId === id);
    }
    update(input) {
        const user = this.findOne(input.userId);
        if (!user)
            return undefined;
        Object.assign(user, input);
        return user;
    }
    remove(id) {
        const user = this.findOne(id);
        this.users = this.users.filter(user => user.userId !== id);
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map