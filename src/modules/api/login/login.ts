import { Body, Controller, Delete, Get, Param, Post, Put } from 'routing-controllers';

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