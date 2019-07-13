import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@Controller()
export class UserController {

    user = {
        email: undefined,
        password: undefined,
    };

    @Post("/login")
    login(@Body() user: any) {
        return "kkkk";
    }

}