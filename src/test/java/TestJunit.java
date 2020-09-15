import dao.MovieDao;
import dao.impl.HistoryDaoImpl;
import dao.impl.ShowHistoryDaoImpl;
import factory.BeanFactory;
import org.apache.commons.dbutils.QueryRunner;
import org.junit.Test;
import pojo.Histories;
import pojo.ShowHistory;
import service.MovieService;
import service.ShowHistoryService;
import service.impl.HistoryServiceImpl;
import util.DBUtil;

import java.sql.SQLException;
import java.util.List;

/**
 * @Author Miss kun
 * @Date 2020/9/12 15:02
 * @Version 1.0
 */
public class TestJunit{
    //测试工厂类
    @Test
    public void testFactory(){
        HistoryServiceImpl userService = BeanFactory.getInstance("UserService", HistoryServiceImpl.class);
        HistoryDaoImpl userDao = BeanFactory.getInstance("UserDao", HistoryDaoImpl.class);
        System.out.println(userService);
        System.out.println(userDao);
    }
    //测试连接池是否成功
    @Test
    public void testC3p0(){
        System.out.println(DBUtil.getConnection());
        System.out.println(DBUtil.getDataSource());
    }


    MovieService movie=BeanFactory.getInstance("HistoryService",MovieService.class);
    ShowHistoryService show=BeanFactory.getInstance("ShowHistoryService",ShowHistoryService.class);

    /**
     * create by: sky
     * create time: 8:58 2020/9/15
     * 增加测试
     * @Param:
     * @return void
     */
    @Test
    public void addTest(){
        int i=movie.movieAdd(new Histories(15,19,200));
        System.out.println(i);
    }


    /**
     * create by: sky
     * create time: 8:59 2020/9/15
     * 删除测试
     * @Param:
     * @return void
     */
    @Test
    public void deleteTest(){
        int i=movie.movieDelete(1);
        System.out.println(i);
    }


    /**
     * create by: sky
     * create time: 8:59 2020/9/15
     * 修改测试
     * @Param:
     * @return void
     */
    @Test
    public void updateTest(){
        Histories histories=new Histories(22,33,44);
        histories.setHistory_id(2);
        Object o=histories;
        int i=movie.movieUpdate(o);
        System.out.println(i);
    }

    /**
     * create by: sky
     * create time: 9:02 2020/9/15
     * 通过id进行查询测试
     * @Param:
     * @return void
     */
    @Test
    public void findTest(){
        Object o=movie.movieFindById(2);
        Histories histories=(Histories)o;
        System.out.println(histories.toString());
    }


    /**
     * create by: sky
     * create time: 9:20 2020/9/15
     * 查询表格行数测试
     * @Param: 
     * @return void
     */
    @Test
    public void numberTest(){
        System.out.println(movie.movieNumber());
    }


    /**
     * create by: sky
     * create time: 9:25 2020/9/15
     * 分页查询测试
     * @Param:
     * @return void
     */
    @Test
    public void listTest(){
        List<Object> o=movie.movieList(1,3);
        for(Object obj:o){
            Histories histories=(Histories)obj;
            System.out.println(histories.toString());
        }
    }


    /**
     * create by: sky
     * create time: 9:33 2020/9/15
     * 用户浏览信息的行数查询测试
     * @Param:
     * @return void
     */
    @Test
    public void showNumberTest(){
        show.historyNumber(15);
        System.out.println(show.historyNumber(15));
    }

    /**
     * create by: sky
     * create time: 9:40 2020/9/15
     * 用户浏览信息测试
     * @Param:
     * @return void
     */
    @Test
    public void showTest(){
        List<Object> o=show.historyList(15,1,2);
        for(Object obj:o){
            ShowHistory showHistory=(ShowHistory)obj;
            System.out.println(showHistory.toString());
        }
    }
}
