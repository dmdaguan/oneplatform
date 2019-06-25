package com.oneplatform.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeesuite.common.util.AssertUtil;
import com.jeesuite.mybatis.plugin.pagination.Page;
import com.jeesuite.mybatis.plugin.pagination.PageExecutor;
import com.jeesuite.mybatis.plugin.pagination.PageExecutor.PageDataLoader;
import com.jeesuite.mybatis.plugin.pagination.PageParams;
import com.oneplatform.user.dao.entity.UserAssetLogEntity;
import com.oneplatform.user.dao.mapper.UserAssetLogEntityMapper;
import com.oneplatform.user.dto.param.UserAssetLogQueryParam;

/**
 * generated by www.jeesuite.com
 */
@Service
public class UserAssetLogService {

	@Autowired
	private UserAssetLogEntityMapper userAssetLogMapper;

	
	public UserAssetLogEntity findUserAssetLogById(Integer id){
		UserAssetLogEntity entity = userAssetLogMapper.selectByPrimaryKey(id);
		AssertUtil.notNull(entity);
		return entity;
	}
	
    public Page<UserAssetLogEntity> pageQuery(PageParams pageParam,UserAssetLogQueryParam param){
		Page<UserAssetLogEntity> page = PageExecutor.pagination(pageParam, new PageDataLoader<UserAssetLogEntity>() {
			@Override
			public List<UserAssetLogEntity> load() {
				return userAssetLogMapper.findListByQueryParam(param);
			}
		});
		return page;
	}

}